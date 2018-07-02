({
	displaySubmittedRejectedAppsByAccount : function(component, event, helper) {
        var colors = {
            gold: "rgba(255,203,75,.7)",
            silver: "rgba(143,134,132,.7)",
            bronze: "rgba(153,119,61,.7)"
        };
        var appsByAccount = component.get("v.appsByAccount");
        var account = component.get("v.account");
        console.log(appsByAccount);
        for (var key in appsByAccount) {
            if (key == account) {
                component.set("v.title", "Submitted apps for: " + account);
                var labels = [];
                var values = [];
                
                labels.push("Submitted");
                values.push(appsByAccount[key].submittedApps);
                labels.push("Rejected");
                values.push(appsByAccount[key].rejectedApps);

                component.chart.data.labels = labels;
                component.chart.data.datasets[0].label = "Apps";
                component.chart.data.datasets[0].data = values;
                component.chart.data.datasets[0].backgroundColor = colors["gold"];
                component.chart.update();
                return;
            }
        }
	}
})