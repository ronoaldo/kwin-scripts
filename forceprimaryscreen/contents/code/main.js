/*
 * Kwin script to place windows always on your primary screen.
 *
 */

function shouldMove(client) {
	return !client.specialWindow && !client.modal;
}

workspace.clientAdded.connect(function(client) {
	// If we have more screens, force new window to be on primary
	if (workspace.numScreens > 1 && shouldMove(client)) {
		var primaryScreenGeometry = workspace.clientArea(KWin.ScreenArea, 0, 0);
		print("Multiple screens setup; moving",
			client.caption, " (", client.windowId, ") ",
			"to primary screen at",	primaryScreenGeometry.x, primaryScreenGeometry.y);
		// Move client to primary screen geometry (x,y) but keep original window size
		var g = client.geometry;
		g.x = primaryScreenGeometry.x;
		g.y = primaryScreenGeometry.y;
		client.geometry = g;
	}
});
