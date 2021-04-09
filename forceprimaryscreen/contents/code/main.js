/*
 * Kwin script to place windows always on your primary screen.
 *
 */

function shouldMove(window) {
	// Should not move if the window is special, modal or transient for other window
	var specialWindow = window.specialWindow || window.modal || window["transient"];
	if (specialWindow) {
		return false;
	}
	// If a non-special window is added, but is already in the right screen, avoid moving
	if (window.screen === 0) {
		return false;
	}
	// Move all the other cases to the right screen
	return true;
}

workspace.clientAdded.connect(function(w) {
	if (workspace.numScreens > 1 && shouldMove(w)) {
		workspace.sendClientToScreen(w, 0);
	}
});
