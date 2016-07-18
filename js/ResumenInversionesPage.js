var ResumenInversionesPage = function(utils) {

	var pesosSum = 0;
	var dollarsSum = 0;

	var $allTables = $();
	var $plazosFijosTable = $();
	var $fondosPesosTable = $();
	var $fondosDollarsTable = $();
	var $bonosTable = $();
	var $accionesTable = $();

	var totalTrStr = "<tr class='tilesTRInfo'><td class='sub' colspan='{{colspan}}'><strong>TOTAL</strong></td><td align='right'><strong><table width='20' border='0' style='table-layout:auto; background-color:transparent; width:20px !important;'><tbody><tr><td align='left' style='border-width:0px; padding: 1px 2px 1px 1px; background-color:transparent;' nowrap=''>$</td><td align='right' style='border-width:0px; padding: 1px; background-color:transparent;' nowrap=''>{{totalPesos}}</td></tr></tbody></table></strong></td><td align='right'><strong><table width='20' border='0' style='table-layout:auto; background-color:transparent; width:20px !important;'><tbody><tr><td align='left' style='border-width:0px; padding: 1px 2px 1px 1px; background-color:transparent;' nowrap=''>U$S</td><td align='right' style='border-width:0px; padding: 1px; background-color:transparent;' nowrap=''>{{totalDollars}}</td></tr></tbody></table></strong></td><td>&nbsp;</td></tr>";

	var setTables = function() {
		$("table.header").each(function() {
			var title = $(this).find("> tbody > tr > td").text();
			var $table = $(this).nextAll("table:first");
			$allTables = $allTables.add($table);

			if (title == "PLAZOS FIJOS") {
				$plazosFijosTable = $table;
			} else if (title == "FONDOS OPERATIVOS EN PESOS") {
				$fondosPesosTable = $table;
			} else if (title == "FONDOS OPERATIVOS EN DÓLARES") {
				$fondosDollarsTable = $table;
			} else if (title == "BONOS") {
				$bonosTable = $table;
			} else if (title == "ACCIONES") {
				$accionesTable = $table;
			}
		});
	}

	var changeTableLinkTexts = function() {
		var replaceTexts = {
			"Más información": "Info",
			"Ver Comprobante": "Comp.",
			"Modificar acción al vto.": "Acción vto.",
			"Últimos movimientos": "Ult. movimientos"
		};

		$allTables.find(".resumen a").each(function() {
			var replaceText = replaceTexts[$(this).text()];
			if (replaceText) {
				$(this).attr("title", $(this).text());
				$(this).text(replaceText);
			}
		});

		$plazosFijosTable.find("td:last-child").each(function() {
			$(this).html($("<div class='formlink'>").html($(this).html()));
		});
	};

	var addDescriptionColumnToBonosTable = function() {
		var $bonoColumnHeader = $bonosTable.find("> tbody > tr.title > th:nth-child(2)");
		$bonoColumnHeader.after($bonoColumnHeader.clone().text("Descripcion"));

		$bonosTable.find("> tbody > tr:not(.title)").each(function() {
			var $link = $(this).find("div.formlink a:first");
			var description = $link.length ? $link.attr("href").split("\"")[3] : "";
			var $bonoColumn = $(this).find("> td:nth-child(2)");
			$bonoColumn.after($bonoColumn.clone().css("white-space", "nowrap").text(description));
		});

		$bonosTable.find("> tbody > tr:last td:first").attr("colspan", "5");
	};

	var appendTotals = function() {
		// PF
		pesosSum += utils.parseValueToFloat($plazosFijosTable.find("> tbody > tr:last > td:eq(1) td[align=right]").text());
		dollarsSum += utils.parseValueToFloat($plazosFijosTable.find("> tbody > tr:last > td:eq(2) td[align=right]").text());

		// Fondos
		var fondosPesosSum = 0;
		$fondosPesosTable.find("tr.fondos > td:nth-child(5)").each(function() {
			fondosPesosSum += utils.parseValueToFloat($(this).text().replace("$", ""));
		});
		$fondosPesosTable.find("> tbody").append(totalTrStr.replace("{{colspan}}", "4").replace("{{totalPesos}}", utils.parseValueToString(fondosPesosSum)).replace("{{totalDollars}}", "0"));
		pesosSum += fondosPesosSum;

		var fondosDollarsSum = 0;
		$fondosDollarsTable.find("tr.fondos > td:nth-child(6)").each(function() {
			fondosDollarsSum += utils.parseValueToFloat($(this).text().replace("U$S", ""));
		});
		$fondosDollarsTable.find("> tbody").append(totalTrStr.replace("{{colspan}}", "4").replace("{{totalPesos}}", "0").replace("{{totalDollars}}", utils.parseValueToString(fondosDollarsSum)));
		dollarsSum += fondosDollarsSum;

		// Bonos
		pesosSum += utils.parseValueToFloat($bonosTable.find("> tbody > tr:last > th:eq(0) td[align=right]").text());

		// Acciones
		pesosSum += utils.parseValueToFloat($accionesTable.find("> tbody > tr:last > th:eq(0) td[align=right]").text());

		var totalTr = totalTrStr.replace("{{colspan}}", "1").replace("{{totalPesos}}", utils.parseValueToString(pesosSum)).replace("{{totalDollars}}", utils.parseValueToString(dollarsSum));
		$allTables.last().after("<table style='margin: 50px 100px;'><tbody>" + totalTr + "</tbody></table>");
	};

	// Init
	(function() {
		setTables();

		changeTableLinkTexts();
		addDescriptionColumnToBonosTable();
		appendTotals();
	})();
	

	// Public
	return {};
};