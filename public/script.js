$(document).ready(function() {
    $('#questionForm').submit(function(e) {
        e.preventDefault();
        
        const jobTitle = $('#jobTitle').val().trim();
        
        if (!jobTitle) {
            showError('Please enter a job title');
            return;
        }

        // Show loading state
        $('#btnText').text('Generating...');
        $('#loadingSpinner').removeClass('hidden');
        $('#submitBtn').prop('disabled', true);
        $('#jobTitle').prop('disabled', true);
        $('#resultsContainer').empty();
        $('#errorMessage').addClass('hidden');

        // Make API call
        $.ajax({
            url: '/api/generate',
            method: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ job_title: jobTitle }),
            success: function(response) {
                // Hide loading state
                $('#btnText').text('Generate Questions');
                $('#loadingSpinner').addClass('hidden');
                $('#submitBtn').prop('disabled', false);
                $('#jobTitle').prop('disabled', false);

                // Show questions
                const questions = response.questions;
                $('#resultsContainer').empty();
                
                questions.forEach(function(question, index) {
                    const questionHtml = `
                        <div class="border border-gray-200 rounded-md p-4 flex items-start gap-3">
                            <span class="flex-shrink-0 w-6 h-6 bg-gray-900 text-white text-xs font-medium rounded-full flex items-center justify-center">${index + 1}</span>
                            <p class="text-gray-700 text-sm">${question}</p>
                        </div>
                    `;
                    $('#resultsContainer').append(questionHtml);
                });
            },
            error: function(xhr) {
                // Hide loading state
                $('#btnText').text('Generate Questions');
                $('#loadingSpinner').addClass('hidden');
                $('#submitBtn').prop('disabled', false);
                $('#jobTitle').prop('disabled', false);

                // Show error
                const errorMessage = xhr.responseJSON?.detail || 'Failed to generate questions. Please try again.';
                showError(errorMessage);
            }
        });
    });

    function showError(message) {
        $('#errorMessage').text(message);
        $('#errorMessage').removeClass('hidden');
    }
});
