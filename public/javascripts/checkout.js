var stripe = Stripe('pk_test_ARcKUxTOUW0dvXHTQ7M3aEUG');
var elements = stripe.elements({
    locale: 'auto'
});

// Custom styling can be passed to options when creating an Element.
var style = {
    base: {
      color: '#32325d',
      lineHeight: '18px',
      fontFamily: '"Avenir Next", Helvetica',
      fontSmoothing: 'antialiased',
      fontSize: '16px',
      '::placeholder': {
        color: '#aab7c4'
      }
    },
    invalid: {
      color: '#fa755a',
      iconColor: '#fa755a'
    }
};

function triggerBrowserValidation() {
    // The only way to trigger HTML5 form validation UI is to fake a user submit
    // event.
    var submit = document.createElement('input');
    submit.type = 'submit';
    submit.style.display = 'none';
    form.appendChild(submit);
    submit.click();
    submit.remove();
}
  
  // Create an instance of the card Element.
  var card = elements.create('card', {style: style});
  
  // Add an instance of the card Element into the `card-element` <div>.
  card.mount('#card-element');

  registerElements([card]);
  

  function registerElements(elements) {

    var form = document.querySelector('form'); 

  
    function enableInputs() {
      Array.prototype.forEach.call(
        form.querySelectorAll(
          "input[type='text'], input[type='email'], input[type='tel']"
        ),
        function(input) {
          input.removeAttribute('disabled');
        }
      );
    }
  
    function disableInputs() {
      Array.prototype.forEach.call(
        form.querySelectorAll(
          "input[type='text'], input[type='email'], input[type='tel']"
        ),
        function(input) {
          input.setAttribute('disabled', 'true');
        }
      );
    }
  
    function triggerBrowserValidation() {
      // The only way to trigger HTML5 form validation UI is to fake a user submit
      // event.
      var submit = document.createElement('input');
      submit.type = 'submit';
      submit.style.display = 'none';
      form.appendChild(submit);
      submit.click();
      submit.remove();
    }
  
  
    // Listen on the form's 'submit' handler...
    form.addEventListener('submit', function(e) {
      e.preventDefault();
  
      // Trigger HTML5 validation UI on the form if any of the inputs fail
      // validation.
      var plainInputsValid = true;
      Array.prototype.forEach.call(form.querySelectorAll('input'), function(
        input
      ) {
        if (input.checkValidity && !input.checkValidity()) {
          plainInputsValid = false;
          return;
        }
      });
      if (!plainInputsValid) {
        triggerBrowserValidation();
        return;
      }
  
      // Disable all inputs.
      disableInputs();
  
      // Gather additional customer data we may have collected in our form.
      var name = form.querySelector('#name');
      var address1 = form.querySelector('#address');
      var city = form.querySelector('#city');
      var state = form.querySelector('#state');
      var zip = form.querySelector('#zip');
      var country = form.querySelector('#country');
      var itemsize = document.querySelector('#itemsize');
      var additionalData = {
        name: name ? name.value : undefined,
        address_line1: address1 ? address1.value : undefined,
        address_city: city ? city.value : undefined,
        address_state: state ? state.value : undefined,
        address_zip: zip ? zip.value : undefined,
        address_country: country ? country.value : undefined,
        item_size: itemsize ? itemsize.value : undefined
      };
  
      // Use Stripe.js to create a token. We only need to pass in one Element
      // from the Element group in order to create a token. We can also pass
      // in the additional customer data we collected in our form.
      stripe.createToken(elements[0], additionalData).then(function(result) {
  
        if (result.token) {
          // If we received a token, show the token ID.
          stripeTokenHandler(result.token);
        } else {
          // Otherwise, un-disable inputs.
          enableInputs();
          var errorElement = document.getElementById('card-errors');
          errorElement.textContent = result.error.message;
        }
      });
    });
  
    function stripeTokenHandler(token) {
      // Insert the token ID into the form so it gets submitted to the server
      var form = document.getElementById('payment-form');
      var hiddenInput = document.createElement('input');
      hiddenInput.setAttribute('type', 'hidden');
      hiddenInput.setAttribute('name', 'stripeToken');
      hiddenInput.setAttribute('value', token.id);
      var hiddeninput2 = document.createElement('input');
      hiddeninput2.setAttribute('type', 'hidden');
      hiddeninput2.setAttribute('name', 'email');
      hiddeninput2.setAttribute('value', form.querySelector('#email').value);
      var sizing = document.createElement('input');
      sizing.setAttribute('type', 'hidden');
      sizing.setAttribute('name', 'size');
      sizing.setAttribute('value', document.querySelector('#itemsize').innerHTML);
      form.appendChild(hiddenInput);
      form.appendChild(hiddeninput2);
      form.appendChild(sizing);
    
      // Submit the form
      form.submit();
    }
  
  }