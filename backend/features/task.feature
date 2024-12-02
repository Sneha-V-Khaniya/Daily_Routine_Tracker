Feature: Task management

    Scenario: Add a Task
        Given the system is running
        When I send a POST request to "/api/task" with:
            | userID    | 6731c213377580bbb3b22709      |
            | taskName  | meditation    |
        Then the response status should be 201
        And the response status should contain "Task created successfully"
    
    