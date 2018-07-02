({
	scriptsLoaded : function(component, event, helper) {

		var ctx = component.find("chart").getElement();
        component.chart = new Chart(ctx,{
            type: 'bar',
            data: {
                labels: [],
                datasets: [
                    {
                        label: "",
                        data: [],
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
				scales: {
                    yAxes: [{
                        ticks: {
                            beginAtZero:true
                        }
                    }]
                }
            }
        });
		
	},
    
    chartChange: function(component, event, helper) {
        
        var filters = event.getParam("data");
        if (!filters || !filters.account) {
            return;
        };
        component.set("v.account", filters.account);
        
        var action = component.get("c.getSubmittedRejectedAppsByAccount");
        action.setParams({
        	accountName : filters.account
    	});
        action.setCallback(this, function(response) {
            var state = response.getState();
            if (state === "SUCCESS") {
                component.set("v.appsByAccount", response.getReturnValue());
                helper.displaySubmittedRejectedAppsByAccount(component, event, helper);
            }
        });
        $A.enqueueAction(action);
    }
    
})