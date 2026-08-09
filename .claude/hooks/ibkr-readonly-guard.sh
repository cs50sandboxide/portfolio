#!/usr/bin/env bash
# ---------------------------------------------------------------------------
# IBKR read-only guard.
#
# The automation in this repository exists to READ portfolio data and publish
# it to a website. It must never place, modify or cancel an order, and never
# mutate watchlists or alerts.
#
# This is an ALLOWLIST, not a denylist: anything not named below is blocked,
# including tools added by future versions of the IBKR connector that this
# file has never heard of. That is the point — a denylist silently fails open
# the moment the connector grows a new write tool.
#
# SERVER-NAME AGNOSTIC. The same connector surfaces under different names in
# different sessions — "Interactive_Brokers_IBKR" here, "Interactive-Brokers--IBKR-"
# in the routine's config. Matching one exact spelling would let the other
# sail straight through, so this matches any MCP server whose name looks like
# IBKR and ignores punctuation entirely.
#
# Wired up as a PreToolUse hook in .claude/settings.json with matcher "mcp__",
# so every MCP tool is inspected and non-IBKR ones pass through untouched.
# ---------------------------------------------------------------------------
set -uo pipefail

ALLOWED_TOOLS='
get_account_summary
get_account_positions
get_pa_performance_all_periods
get_pa_allocation
get_price_history
get_price_snapshot
'

payload=$(cat)
tool=$(printf '%s' "$payload" | jq -r '.tool_name // empty' 2>/dev/null)

# Only MCP tools are in scope.
case "$tool" in
    mcp__*) ;;
    *) exit 0 ;;
esac

# mcp__<server>__<tool>  — split on the first "__" after the prefix.
rest="${tool#mcp__}"
server="${rest%%__*}"
name="${rest#*__}"

# Normalise: lowercase, strip every non-alphanumeric character. So
# "Interactive_Brokers_IBKR" and "Interactive-Brokers--IBKR-" both become
# "interactivebrokersibkr".
squash=$(printf '%s' "$server" | tr '[:upper:]' '[:lower:]' | tr -cd '[:alnum:]')

case "$squash" in
    *ibkr*|*interactivebroker*) ;;
    *) exit 0 ;;                    # some other MCP server — not our business
esac

for allowed in $ALLOWED_TOOLS; do
    [ "$name" = "$allowed" ] && exit 0
done

reason="BLOCKED by .claude/hooks/ibkr-readonly-guard.sh — '${name}' is not on the \
read-only allowlist for this repository. This automation may only READ portfolio \
data from Interactive Brokers; it must never place, modify or cancel orders, and \
never alter watchlists or alerts. Permitted tools: $(echo $ALLOWED_TOOLS | tr '\n' ' '). \
Do not attempt a workaround, and do not retry via another route. Stop and report \
that this tool was blocked."

jq -nc --arg r "$reason" '{
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "deny",
    permissionDecisionReason: $r
  }
}'
exit 0
