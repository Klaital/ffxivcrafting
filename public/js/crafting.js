var crafting={init:function(){crafting.events(),crafting_tour.init()},events:function(){$("#self_sufficient_switch").change(function(){$(this).closest("form").submit()}),$("#obtain-these-items .collapse").click(function(){var a=$(this);a.toggleClass("glyphicon-chevron-down").toggleClass("glyphicon-chevron-up");var b=$(this).closest("tbody"),c=b.find("tr:not(:first-child)");c.toggleClass("hidden")}),$(".needed input").change(function(){return crafting.recalculate_all()}),$("input.obtained").change(function(){return crafting.recalculate_all()}),$(".obtained-ok").click(function(){var a=$(this).closest("tr"),b=a.find(".needed input"),c=b.val(),d=a.find("input.obtained");0==b.length&&(b=a.find(".needed span"),c=b.html()),d.val(c).trigger("change")}),crafting.recalculate_all()},recalculate_all:function(){$("#Gathered-section, #Other-section, #PreRequisiteCrafting-section").find(".needed span").html(0),$("#CraftingList-section .needed input").each(function(){var a=$(this),b=a.closest("tr"),c=b.data("yields");crafting.change_reagents(b,Math.ceil((a.val()-b.find(".obtained").val())/c))}),$("#Gathered-section, #Other-section, #PreRequisiteCrafting-section").find(".obtained").each(function(){var a=$(this),b=a.closest("tr"),c=b.find(".needed span"),d=parseInt(a.val()),e=parseInt(c.html()),f=e-d;0>f&&(a.val(d+f),f=0),c.html(f),b[(0>=f?"add":"remove")+"Class"]("success")})},change_reagents:function(a,b,c){var d=a.data("requires"),e=a.data("itemId");if("undefined"!=typeof d&&""!=d){var f=d.split("&");a.hasClass("exempt")&&$("tr.reagent:not(.exempt)[data-item-id="+e+"]").length>0&&(f[f.length]="1x"+e);for(var g=0;g<f.length;g++){var h=f[g].split("x"),i=h[0],j=h[1],k=$("tr.reagent:not(.exempt)[data-item-id="+j+"]"),l=k.find("input.obtained"),m=k.find(".needed span"),n=k.data("yields"),o=parseInt(m.html()),p=parseInt(l.val()),q=Math.ceil(b*i/n),r=q*n,s=o+r;m.html(s),l.attr("max",s),j!=e&&crafting.change_reagents(k,Math.ceil(q-p/n),c+" ")}}}},crafting_tour={tour:null,first_run:!0,init:function(){var a=$("#start_tour");crafting_tour.tour=new Tour({orphan:!0,onStart:function(){return a.addClass("disabled",!0)},onEnd:function(){return a.removeClass("disabled",!0)}}),a.click(function(a){a.preventDefault(),$("#toggle-slim").bootstrapSwitch("status")&&$("#toggle-slim").bootstrapSwitch("setState",!1),1==crafting_tour.first_run&&crafting_tour.build(),$(this).hasClass("disabled")||crafting_tour.tour.restart()})},build:function(){crafting_tour.tour.addSteps([{element:"#CraftingList-section",title:"Recipe List",content:"The list at the bottom is your official Recipe List.  You will be making these items.",placement:"top"},{element:"#Gathered-section tr:first-child",title:"Gathered Section",content:"Items you can gather with MIN, BTN or FSH will appear in the Gathered Section.",placement:"bottom"},{element:"#Bought-section tr:first-child",title:"Bought Section",content:"Items you cannot gather will be thrown into the Bought Section.",placement:"bottom"},{element:"#Other-section tr:first-child",title:"Other Section",content:"Items that cannot be bought or gathered show up in the Other Section.  Most likely these will involve monster drops.",placement:"bottom"},{element:"#PreRequisiteCrafting-section tr:first-child",title:"Pre-Requisite Crafting",content:"Why buy what you can craft?  The Crafted Section contains items necessary for your main recipes to finish.  The previous sections will already contain the sub items required.",placement:"bottom"},{element:"#self-sufficient-form",title:"Self Sufficient",content:"By default it assumes you want to be Self Sufficient.  Turning this option off will eliminate the Gathering and Crafting aspect and appropriately force the items into either Bought or Other.",placement:"top"},{element:"#leveling-information",title:"Leveling Information",content:"Pay attention to the Leveling Information box as it will give you a heads up as to what your next quest turn ins will require.",placement:"top"}]),crafting_tour.first_run=!1}};$(crafting.init);