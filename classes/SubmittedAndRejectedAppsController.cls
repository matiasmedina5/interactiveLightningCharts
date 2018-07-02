public with sharing class SubmittedAndRejectedAppsController {
    @AuraEnabled
    public static Map<String, WrapperClass> getSubmittedRejectedAppsByAccount(String accountName) {
        Map<String, WrapperClass> result = new Map<String, WrapperClass>();
        Integer submittedApps = 0;
        Integer rejectedApps = 0;
        List<Application__c> apps = [
            SELECT Id, Status__c FROM Application__c 
            WHERE Application_Submission_Date__c != null AND Contractor__r.Name =: accountName
        ];
        for (Application__c app : apps) {
            if (app.Status__c == 'Rejected') {
                rejectedApps+=1;
            } else {
                submittedApps+=1;
            }
        }
        WrapperClass wc = new WrapperClass();
        wc.rejectedApps = rejectedApps;
        wc.submittedApps = submittedApps;
        result.put(accountName, wc);
        return result;
    }
	// Wrapper class to hold how many rejected and submitted apps are
    public class WrapperClass {
        @AuraEnabled
        public Integer rejectedApps;
        @AuraEnabled
        public Integer submittedApps;
    }
}