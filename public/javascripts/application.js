(function(){
	$("#submitBtn").click(function(){
		var $emailTxt = $("#emailTxt");
		var $error = $("#error");
		var v = $emailTxt.val();
		if ($.trim(v) == "")
			return;
		if (!/\w+@\w+\.\w+/.test(v))
			return;
		$.ajax({
			url: "/users",
			type: "POST",
			data: { email: $emailTxt.val() },
			success: function(ret){
				if (ret.retCode){
					$emailTxt.val("");
					$error.text("嘿,小伙伴,申请成功,我们将会尽快联系您,请注意查收您的邮件.");
				}else
					$error.text(ret.error);
			}
		});
		// alert("xx");
	});
})();