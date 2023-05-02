const User = require("./user/model");
const fs = require("fs");
const path = require("path");

function notify(message, user) {
  const filePath = path.join(__dirname, "logs", "notifications.log");
  const currentTime = new Date().toLocaleString("en", {
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  fs.appendFile(
    filePath,
    `${currentTime} | to: ${user._id} | message: ${message}\n`,
    (err) => {
      if (err) {
        console.error("Failed to write to file:", err);
      } else {
        console.log("Logged:", message);
      }
    }
  );
}

const setNotification = async (slot, doctor) => {
  const user = await User.findOne({ _id: slot.client });
  let firstNotificationTimeout =
    new Date(slot.time).getTime() - 24 * 60 * 60 * 1000 - new Date().getTime() <
    0;

  const secondNotificationTimeout =
    new Date(slot.time).getTime() - 2 * 60 * 60 * 1000 - new Date().getTime();
  if (secondNotificationTimeout < 0) secondNotificationTimeout = 0;

  if (firstNotificationTimeout > 0)
    setTimeout(
      () =>
        notify(
          `Напоминаем, Вы записались на приём к врачу ${
            doctor.name
          } завтра, в ${slot.time.toLocaleString("ru", {
            // ВО вторник, но В четверг, да...
            weekday: "long",
            hour: "numeric",
            minute: "numeric",
          })}.`,
          user
        ),
      firstNotificationTimeout
    );

  setTimeout(
    () =>
      notify(
        `Напоминаем, Вы записались на приём к врачу ${
          doctor.name
        } через 2 часа, в ${slot.time.toLocaleString("ru", {
          hour: "numeric",
          minute: "numeric",
        })}.`,
        user
      ),
    secondNotificationTimeout
  );
};
module.exports = setNotification;
