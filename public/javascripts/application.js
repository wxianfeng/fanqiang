(function(){
	$("#submitBtn").click(function(){
		var $emailTxt = $("#emailTxt");
		$.ajax({
			url: "/users",
			type: "POST",
			data: { email: $emailTxt.val() },
			success: function(ret){
				$emailTxt.val("");
			}
		});
		// alert("xx");
	});
})();