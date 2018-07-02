({
	doInit : function(component, event, helper) {
        var action = component.get("c.getAppsByAccount");
        action.setCallback(this, function(response){
            var state = response.getState();
            if (state === "SUCCESS") {
                console.log(response.getReturnValue());
                component.set("v.appsByAccount", response.getReturnValue());
                helper.displayAppsByAccount(component, event, helper);
            }
        });
        $A.enqueueAction(action);
	}
})