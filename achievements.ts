/**
 * A namespace that handles achievement getting, setting, remembering, and displaying!
 */
//% color="#009900"
namespace Achievements {
    /**
     * Show an achievement.
     * @param displayName: The name of the achievement that is shown to the player.
     * @param displayDescription: The discription of the achievement that is shown to the player - optional.
     * @param icon: The icon of the achievement when shown to the player, must be 8x8 otherwise ignored.
     */
    //% block="show achievement with title as $displayName||and description as $displayDescription|at speed $speed|and icon as $icon"
    //% icon.shadow=screen_image_picker
    //% speed.defl=1
    //% expandableArgumentMode="enabled"
    //% weight=90
    export function showAchievement(displayName: string, displayDescription?: string, speed?: number, icon?: Image) {
        if (!(displayDescription)) {
            displayDescription = ""
        }
        Notification.waitForNotificationFinish()
        if (displayDescription == "") {
            Notification.notify("Achievement get: " + displayName + "!", speed, icon)
        } else {
            Notification.notify("Achievement get! " + displayName + ": " + displayDescription, speed, icon)
        }
    }
    /**
     * Check for an achievement. 
     * @param achievementName: The name of the achievement that is used internally.
     * @param condition: Whether the achievement conditions are true, could be the result of a 
     *   function or whether a number is greater than some other number.
     * @return: Returns a boolean depending on whether this is the first time the condition is true.
     */
    //% block="check for achievement named $achievementName in condition $condition"
    //% icon.shadow=screen_image_picker
    //% expandableArgumentMode="enabled"
    //% weight=100
    export function checkForAchievement(achievementName: string, condition: boolean = false) {
        achievementName = "achievement_" + achievementName
        let value = 1
        if (!(condition)) {
            value = 0
        }
        if (!(blockSettings.exists(achievementName))) {
            blockSettings.writeNumber(achievementName, 0)
        }
        if (value == 1 && blockSettings.readNumber(achievementName) == 0) {
            blockSettings.writeNumber(achievementName, 1)
            return true
        }
        return false
    }
    /**
     * Reset an achievement.
     * @param achievementName: The name of the achievement that is used internally, does nothing if not found.
     */
    //% block="reset achievement named $achievementName"
    //% weight=80
    export function resetAchievement(achievementName: string) {
        achievementName = "achievement_" + achievementName
        if (blockSettings.exists(achievementName) && blockSettings.readNumber(achievementName) == 1) {
            blockSettings.writeNumber(achievementName, 0)
        }
    }
    /**
     * Reset all achievements.
     */
    //% block="reset all achievements"
    //% weight=70
    export function resetAllAchievements() {
        function startsWith(startString: string, search: string, rawPos?: number) {
            let pos = rawPos > 0 ? rawPos|0 : 0;
            return startString.substr(pos, pos + search.length) === search;
        }
        for (let name of blockSettings.list()) {
            if (startsWith(name, "achievement_") && blockSettings.readNumber(name) == 1) {
                blockSettings.writeNumber(name, 0)
            }
        }
    }
}
