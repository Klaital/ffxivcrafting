var list={init:function(){$(".update-list-item").change(function(){var d=$(this).closest("tr");var e=d.data("itemId"),a=d.data("itemName"),b=parseInt($(this).val());var c="Updating the quantity for "+a;if(b<=0){c=a+" will be deleted from your list"}$.ajax({url:"/list/edit",type:"post",data:{"item-id":e,amount:b},beforeSend:function(){global.noty({type:b<=0?"warning":"information",text:c})}})});$(".delete-list-item").click(function(){var b=$(this).closest("tr");var c=b.data("itemId"),a=b.data("itemName");$.ajax({url:"/list/delete",type:"post",data:{"item-id":c},beforeSend:function(){global.noty({type:"warning",text:"Deleting "+a+" from your list"})},complete:function(){global.fade_and_destroy(b);setTimeout(list.check_if_empty,1000)}})})},check_if_empty:function(){if($("#list tbody tr").length==0){window.location="/list"}}};$(list.init);