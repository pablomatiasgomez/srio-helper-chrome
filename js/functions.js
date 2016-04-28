(function() {

	var RESUMEN_INVERSIONES_PATH_NAME = "/hb/html/inversiones/invRes.jsp";
	
	var utils = new Utils();

	switch (location.pathname) {
		case RESUMEN_INVERSIONES_PATH_NAME:
			ResumenInversionesPage(utils);
			break;
		default:
	}

})();