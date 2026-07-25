import sys

with open(r"c:\Users\SupérateSantiago\Fynder\Fynder-2.0\fynder.js", "r", encoding="utf-8") as f:
    content = f.read()

bad_count_before = content.count("\ufffd")
print(f"Replacement chars before: {bad_count_before}")

# Fix 1: card onclick - replace markNotifRead with deleteNotif
old1 = "markNotifRead(${n.id});this.classList.add('msg-notif-card--read');updateNotifBadge()${n.bizId ? `;openChatById('${n.bizId}')` : ''}\">"
new1 = "deleteNotif(${n.id})${n.bizId ? `;openChatById('${n.bizId}')` : ''}\">"
if old1 in content:
    content = content.replace(old1, new1)
    print("Fix 1 (card onclick) applied")
else:
    print("Fix 1 NOT found - trying alternate")
    # show context
    idx = content.find("markNotifRead(${n.id});this.classList")
    if idx >= 0:
        print(repr(content[idx:idx+200]))

bad_count_after = content.count("\ufffd")
print(f"Replacement chars after: {bad_count_after}")

with open(r"c:\Users\SupérateSantiago\Fynder\Fynder-2.0\fynder.js", "w", encoding="utf-8") as f:
    f.write(content)

print("Done")
