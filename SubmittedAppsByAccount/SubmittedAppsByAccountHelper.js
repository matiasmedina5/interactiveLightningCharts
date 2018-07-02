({
	displayAppsByAccount : function(component, event, helper) {
        var charType = component.get("v.charType");
        var appsByAccount = component.get("v.appsByAccount");
        var labels = [];
		var values = [];
        var colors = [];

        for (var key in appsByAccount) {
            labels.push(key);
            values.push(appsByAccount[key]);
			colors.push(this.getRandomColor());            
        }
        /*var datasets = [];
        for (var i=0; i < values.length; i++) {
            datasets.push({
                label: labels[i], 
                data: values[i],
                fill: false,
                borderWidth: 1.5,
                backgroundColor: colors[i],
                borderColor: "#000000",
                pointBackgroundColor: "#FFFFFF",
                pointBorderWidth: 4,
                pointHoverRadius: 8,
                pointRadius: 6,
                pointHitRadius: 10,
            });
            
        }*/
        var chartdata = {
            labels: labels,
            datasets: [
                {
                    label: 'Applications by Account',
                    data: values,
                    backgroundColor: colors, // can accept an array of strings (colors: rgb, hexa or just string)
                    borderColor: 'black', // Color/Color[]
                    borderWidth: 1.5, // Number only
                    fill: false,
                    pointBackgroundColor: "#FFFFFF",
                	pointBorderWidth: 4,
                	pointHoverRadius: 8,
                	pointRadius: 6,
                	pointHitRadius: 10
                }
            ]
        }
        
        var ctx = component.find("graph").getElement();
        var chart = new Chart(ctx, {
                type: charType,
            	data: chartdata,
                options: {
                	responsive: true,
                	maintainAspectRatio :false,
                	onClick: function(event) {
                    	var elements = chart.getElementAtEvent(event);
                    	console.log("elements");
                    	console.log(elements);
                    	if (elements.length === 1) {
                        	var acc = labels[elements[0]._index];
                        	//var country = datasets[elements[0]._datasetIndex].label;
							var chartEvent = $A.get("e.c:ChartEvent");
                        	chartEvent.setParams({
                            	data: {account: acc}
                        	});
        					chartEvent.fire();
                    	}
                	}
            	}
            });
    },
    
    // This function will generate colors dynamically 
    getRandomColor : function(component) {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++ ) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
})