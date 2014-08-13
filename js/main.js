



	
	var myDataRef = new Firebase("https://luminous-fire-508.firebaseio.com/");
	var myDataRef2 = new Firebase("https://luminous-fire-510.firebaseio.com/");
	$("#messageInput").keypress(function (e) {
		if (e.keyCode == 13){
			var name = $("#nameInput").val();
			var message = $("#messageInput").val();
			myDataRef.push({
				name: name,
				text: message
			});
			$("#messageInput").val("");
		}
		
	});
	myDataRef.on('child_added', function(snapshot) {
		var message = snapshot.val();
		displayChatMessage(message.name, message.text);
	});

	function displayChatMessage(name, text) {

		text = LinkParser(text);

        $("#messageChat").append("<strong>" + name +  "</strong>" + ": " + text + "<br>");
       	$("#messageChat")[0].scrollTop = $("#messageChat")[0].scrollHeight;
	};

	$("#clear").click(function(){

		myDataRef.remove();
		$("#messageChat").empty();
		//location.reload();
	});

	// myDataRef2.push({

	// 	x: x,
	// 	y: y

	// });


	function LinkParser(string){

		debugger

		var indexHTTP = string.indexOf("http://");
		var indexHTTPS = string.indexOf("https://");

		if(indexHTTP != -1){

			if(string.charAt(indexHTTP + 7) != null){

				var indexSpace = string.indexOf(" ", indexHTTP);
				
				if(indexSpace == -1) {

					var strHTML = string.substring(indexHTTP, string.length);
					indexSpace = string.length;
				}
				else {
					var strHTML = string.substring(indexHTTP, indexSpace);
				}

				text = string.substring(0, indexHTTP) + '<a href = "' + strHTML + '">' + strHTML + "</a>" + string.substring(indexSpace, string.length + 1);

				return text;
			}

		}

		return string;

	}; //NOTE: THIS CODE WILL NOT WORK IF SPACES ARE BEFORE LINK - REWORK TO INCLUDE THIS EXCEPTION


