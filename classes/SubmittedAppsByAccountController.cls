public with sharing class SubmittedAppsByAccountController {
	@AuraEnabled
    // Method to get the picklist values from Schema
    public static Map<String, Integer> getAppsByAccount() {
        Map<String, Integer> result = new Map<String, Integer>();
        try {
            AggregateResult[] groupedResults = [
                SELECT Contractor__r.Name, COUNT(Id) total FROM Application__c GROUP BY Contractor__r.Name
            ];
            for (AggregateResult ar : groupedResults) {
                if (ar.get('Name') != null) {
                	result.put(String.valueOf(ar.get('Name')), Integer.valueOf(ar.get('total')));
                }
            }
        } catch (QueryException e) {
            System.debug('query exception none accounts by name');
        } catch (Exception e) {
            System.debug('generic exception none accounts by name');
        }
        return result;
    }
}