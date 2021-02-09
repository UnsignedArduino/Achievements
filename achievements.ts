/**
 * A namespace that handles achievement getting, setting, remembering, and displaying!
 */
//% color="#009900"
namespace Achievements {
    /**
     * Check for an achievement. 
     * @param achievementName: The name of the achievement that is used internally.
     * @param condition: Whether the achievement conditions are true, could be the result of a 
     *   function or whether a number is greater than some other number.
     * @param displayName: The name of the achievement that is shown to the player.
     * @param displayDescription: The discription of the achievement that is shown to the player - optional.
     * @param icon: The icon of the achievement when shown to the player, must be 8x8 otherwise ignored.
     * @return: Returns a boolean depending on whether this is the first time the condition is true.
     */
    //% block="check for achievement named $achievementName in condition $condition and display title as $displayName||and description as $displayDescription|and icon as $icon"
    //% icon.shadow=screen_image_picker
    //% expandableArgumentMode="enabled"
    //% weight=90
    export function checkForAchievement(achievementName: string, 
                                        condition: boolean = false, 
                                        displayName: string,
                                        displayDescription?: string,
                                        icon?: Image){
        achievementName = "achievement_" + achievementName
        if (!(displayDescription)) {
            displayDescription = ""
        }
        let value = 1
        if (!(condition)) {
            value = 0
        }
        if (!(blockSettings.exists(achievementName))) {
            blockSettings.writeNumber(achievementName, 0)
        }
        if (value == 1 && blockSettings.readNumber(achievementName) == 0) {
            blockSettings.writeNumber(achievementName, 1)
            if (displayDescription == "") {
                Notification.notify("Achievement get: " + displayName + "!", icon)
            } else {
                Notification.notify("Achievement get! " + displayName + ": " + displayDescription, icon)
            }
            return true
        }
        return false
    }
    /**
     * Check for an achievement. 
     * @param achievementName: The name of the achievement that is used internally.
     * @param condition: Whether the achievement conditions are true, could be the result of a 
     *   function or whether a number is greater than some other number.
     * @param displayName: The name of the achievement that is shown to the player.
     * @param displayDescription: The discription of the achievement that is shown to the player - optional.
     * @param icon: The icon of the achievement when shown to the player, must be 8x8 otherwise ignored.
     */
    //% block="check for achievement named $achievementName in condition $condition and display title as $displayName||and description as $displayDescription|and icon as $icon"
    //% icon.shadow=screen_image_picker
    //% expandableArgumentMode="enabled"
    //% weight=100
    export function checkForAchievementNoReturn(achievementName: string, 
                                                condition: boolean = false, 
                                                displayName: string,
                                                displayDescription?: string,
                                                icon?: Image) {
        checkForAchievement(achievementName, condition, displayName, displayDescription, icon)
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
