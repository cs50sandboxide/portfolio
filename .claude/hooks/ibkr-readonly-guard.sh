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
# Wired up as a PreToolUse hook in .claude/settings.json.
# ---------------------------------------------------------------------------
set -uo pipefail

SERVER_PREFIX='mcp__Interactive_Brokers_IBKR__'

ALLOWED_TOOLS='
get_account_summary
get_account_balances
get_account_positions
get_pa_performance_all_periods
get_pa_allocation
get_price_history
'

payload=$(cat)
tool=$(printf '%s' "$payload" | jq -r '.tool_name // empty' 2>/dev/null)

# Govern IBKR tools only; everything else passes through untouched.
case "$tool" in
    "${SERVER_PREFIX}"*) ;;
    *) exit 0 ;;
esac

name="${tool#"$SERVER_PREFIX"}"

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
