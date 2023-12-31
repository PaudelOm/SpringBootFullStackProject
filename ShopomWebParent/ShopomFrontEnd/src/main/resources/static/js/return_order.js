var returnModal; 
var modalTitle;
var fieldNote;
var orderId;

$(document).ready(function() {
	returnModal = $("#returnOrderModal");
	modalTitle = $("#modalTitle");
	fieldNote = $("#returnNote");
	
	$(".linkReturnOrder").on("click", function(e) {
		e.preventDefault();
		handleReturnOrderLink($(this));
	});
});

function handleReturnOrderLink(link) {
	orderId = link.attr("orderId");
	returnModal.modal("show");
	modalTitle.text("Return Order ID #" + orderId);
}

function submitReturnOrderForm(){
	reason = $("input[name='returnReason']:checked").val();
	note = fieldNote.val();
	sendReturnOrderRequest(reason, note);
	return false;
}

function sendReturnOrderRequest(reason, note){
	requestURL = contextPath + "orders/return";
	requestBody = {orderId: orderId, reason: reason, note: note};
	
	$.ajax({
		type: "POST",
		url: url,
		beforeSend:  function(xhr) {
			xhr.setRequestHeader(csrfHeaderName, csrfValue); 
		}, 
		data: JSON.stringify(requestBody),
		contentType: 'application/json'
	}).done(function(returnResponse) {
		console.log(returnResponse);
	}).fail(function(err) {
		console.log(err);
	});
}