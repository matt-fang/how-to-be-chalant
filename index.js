document.querySelectorAll('.copy-btn').forEach(button => {
  button.addEventListener('click', () => {
    const message = button.parentElement.textContent.replace('Copy', '').trim();
    navigator.clipboard.writeText(message).then(() => {
      button.textContent = 'Copied!';
      setTimeout(() => (button.textContent = 'Copy'), 1000);
    });
  });
});

document.querySelectorAll('.calendar-btn').forEach(button => {
  button.addEventListener('click', () => {
    const h2 = button.previousElementSibling;
    const title = h2.textContent.trim();
    const friendName = document.getElementById('friendName').value.trim();

    const now = new Date();
    const tomorrow = new Date(now);
    tomorrow.setDate(now.getDate() + 1);

    const pad = (num) => String(num).padStart(2, '0');
    const formatDate = (date) => {
      return (
        date.getUTCFullYear() +
        pad(date.getUTCMonth() + 1) +
        pad(date.getUTCDate()) + 'T' +
        pad(date.getUTCHours()) +
        pad(date.getUTCMinutes()) +
        pad(date.getUTCSeconds()) + 'Z'
      );
    };

    const start = formatDate(new Date(tomorrow.setHours(9, 0, 0, 0)));
    const end = formatDate(new Date(tomorrow.setHours(10, 0, 0, 0)));

    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
BEGIN:VEVENT
SUMMARY:${title}
DTSTART:${start}
DTEND:${end}
DESCRIPTION:be chalant
STATUS:CONFIRMED
SEQUENCE:0
BEGIN:VALARM
TRIGGER:-PT10M
DESCRIPTION:Reminder
ACTION:DISPLAY
END:VALARM
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.replace(/\s+/g, '_')}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  });
});

const friendInput = document.getElementById('friendName');
const placeholders = document.querySelectorAll('.friend-placeholder');

friendInput.addEventListener('input', () => {
  const name = friendInput.value.trim();
  placeholders.forEach(span => {
    span.textContent = name ? name : 'them';
  });
});

const toggle = document.querySelector(".dropdown-toggle");
const content = document.querySelector(".dropdown-content");

toggle.addEventListener("click", () => {
  content.style.display = content.style.display === "block" ? "none" : "block";
});