var FormValidator = function(){
	this.inputSelector = ".form__input, .form__area";
	this.alertSelector = ".form__alert";
	this.alertClass    = "alert";
	this.removeClass = function(obj){
		obj.classList.remove(this.alertClass);
	}
};

FormValidator.prototype.closeInput = function(obj){
	var parent = obj.parentNode;
	this.removeClass(parent);
	parent.className += " " + this.alertClass;
	var alert = parent.querySelector(this.alertSelector);
	alert.innerHTML = "Это поле должно быть заполнено обязательно!";
	
	var ctx = this;

	parent.querySelector(this.inputSelector).addEventListener("keyup", function(){
		ctx.removeClass(parent);
	});
};

FormValidator.prototype.validate = function(obj){
	var context = this;
	var result = true;
	var arr = obj.querySelectorAll(context.inputSelector);
	arr.forEach(function(item, index){
		if(item.className.indexOf("required") !== -1){
			if(item.value.length == 0){
				context.closeInput(item);

				result = false;
				return false; //returns all
			}
		}
		if(item.dataset.type){
			switch(item.dataset.type){
				case "mail":
					 var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  					 var mail = re.test(item.value);
  					 if(!mail){
  					 	context.closeInput(item);
  					 	result = false;
  					 	return false;
  					 }
  					 break;
				case "website":
					var url = /^(https?|ftp):\/\/(((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:)*@)?(((\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5])\.(\d|[1-9]\d|1\d\d|2[0-4]\d|25[0-5]))|((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?)(:\d*)?)(\/((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)+(\/(([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)*)*)?)?(\?((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|[\uE000-\uF8FF]|\/|\?)*)?(\#((([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(%[\da-f]{2})|[!\$&'\(\)\*\+,;=]|:|@)|\/|\?)*)?$/i.test(item.value);
  					if(!url){
  					 	context.closeInput(item);
  					 	result = false;
  					 	return false;
  					}
  					break;
				default:
					break;
			}	
		}
		
		//if it is ok
		context.removeClass(item.parentNode);

	})

	return result;
	// console.log(arr);
};

