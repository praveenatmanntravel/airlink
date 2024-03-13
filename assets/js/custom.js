$(document).ready(function(){
  $('#select-passanger').on('click', function (event) {
      event.stopPropagation();
  });
  
  
  $('input[type="radio"]').click(function(){
    var inputValue = $(this).attr("value");
    var targetBox = $("." + inputValue);
    $(".box").not(targetBox).hide();
    $(targetBox).show();
    $("fieldset").not(targetBox).prop('disabled', true);
    $(targetBox).prop('disabled', false);
  });
  
  $(".view-btn").click(function (e) {
      e.preventDefault();
      
      $(this).closest(".list-item.accordion-item").toggleClass("active").siblings().removeClass('active');;
    });
  
    $('.traveldate').daterangepicker({
      "autoApply": true,
      "locale" : {
        "format": "YYYY-MM-DD",
        "separator": " to "
      }
    });
    $('.pnrdaterange').daterangepicker({
      "autoApply": true,
      "locale" : {
        "format": "YYYY-MM-DD",
        "separator": " to "
      }
    });
    
  $('.departdate').daterangepicker({
    "autoApply": true,
    "locale" : {
      "format": "YYYY-MM-DD"
    },
    singleDatePicker: true 
  });
  
        // add Multicity
  
        var addcity = 1;
      $('#searchFlight').on('click', '.addcity', function(){
  
        var data = `<fieldset id="multicity-fieldset"><div class="row multicity box" id="addcitysec_${(addcity++)}">
        <div class="col-md-4">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="from[]" id="from" placeholder="From" />
                <label for="from">From?</label>
            </div>
        </div>
        <div class="col-md-4">
            <div class="form-floating mb-3">
                <input type="text" class="form-control" name="id[]" id="to" placeholder="To?" />
                <label for="to">To?</label>
            </div>   
        </div>
        <div class="col-md-3">
            <div class="form-floating mb-3 w-100">
                <input type="text" class="form-control departdate" name="departdate[]" id="departdate" data-toggle="date-picker" data-single-date-picker="true">
                <label for="departdate">Depart</label>
            </div>     
        </div>
        <div class="col-md-1 d-flex align-items-center">
            <div class="form-floating mb-3">
                <a class="btn btn-light btn-sm remove-city" id="removecity">
                    <i class="mdi mdi-window-close pe-1"></i>remove</a>
            </div>
        </div>
    </div></fieldset>`;
        $(".input-containers").append(data);
        $('.departdate').daterangepicker({
          "locale" : {
            "format": "YYYY-MM-DD"
          },
          singleDatePicker: true 
        });
      });
  
    $('#searchFlight').on("click", ".remove-city", function(e) {
        e.preventdefault;
        $(this).closest(".multicity").remove();
    });
  
  
  
    // select Seat popover
  
    $(".seatAvailable").popover({
      container: "body",
      customClass: "seatavail-info",
      title: '<div class="d-flex justify-content-between"><span>Select Seat</span><span class="closeSeatSelection" style="cursor:pointer;" onClick="closeSeatSelection()" ><i class="mdi mdi-close"></i></span></div>',
      content: `<div class="seatsPopoverDetails d-flex align-items-center mb-3">
                      <div class="seatsIconAvailable">
                          <div class="seatnumber fw-bold"></div>
                      </div>
                      <div class="seatsPopoverDetailsInfo ms-3">
                          <div class="seatsPopoverType">
                              <span class="">Window Seat</span>
                          </div>
                          <div class="seatsPopoverPrice">
                              <div class="test-inlinePrice">
                                  <div class="optionPriceCost fw-bold">$23.00</div>
                              </div>
                          </div>
                      </div>
                     
                  </div>
                  <div class="seatsPopoverOptions" id="abc">
                      <form>
                          <input type="hidden" id="seatno" class="seatno" name="seatno" value="3487">
                      <div class="seatsPopoverOption d-flex justify-content-between">
                          <div class="form-check">
                              <input class="form-check-input" type="radio" name="adult1" id="adult1" value="adult 1" checked autocomplete="off"/>
                              <label class="form-check-label" for="adult1">adult 1 <span class="seatnumberforuser"></span></label>
                          </div> 
                          
                      </div>
                      <div class="seatsPopoverOption d-flex justify-content-between">
                          <div class="form-check">
                              <input class="form-check-input" type="radio" name="adult1" id="adult1" value="adult 1" autocomplete="off"/>
                              <label class="form-check-label" for="adult1">adult 2 <span class="seatnumberforuser"></span></label>
                          </div> 
                          
                      </div>
                      </form>
                  </div>`,
      html: true,
      sanitize: false,
  });
  
  // Share Itinary popover
  
  $(".shareItinerary").popover({
    container: "body",
    title: '<div class="d-flex justify-content-between"><span>Share Itinerary</span><span class="closeSharePopover" style="cursor:pointer;" onClick="closeShareItinerary()" ><i class="mdi mdi-close"></i></span></div>',
    content: `<div class="shareform" id="shareform">
                    <form>
                        <div class="d-flex justify-content-between align-items-center">
                        <input type="text" id="share-input" name="share-input" class="form-control" placeholder="Enter Email/Number">
                        <button type="button" class="btn btn-primary share-btn"><i class="mdi mdi-send-outline mdi-rotate-315"></i></button>
                        </div>
                    </form>
                </div>`,
    html: true,
    sanitize: false,
  });
  
  // Hide all other popover 
  $(document).on('click', function (e) {
    var
        $popover,
        $target = $(e.target);
  
    //do nothing if there was a click on popover content
    if ($target.hasClass('popover') || $target.closest('.popover').length) {
        return;
    }
  
    $('[data-bs-toggle="popover"]').each(function () {
        $popover = $(this);
  
        if (!$popover.is(e.target) &&
            $popover.has(e.target).length === 0 &&
            $('.popover').has(e.target).length === 0)
        {
            $popover.popover('hide');
        } 
    });
  })
  
  //name format popover
  
  $(".nameformat").popover({
    container: "body",
    customClass: "name_format-info",
    title: '<div class="d-flex justify-content-between"><span>Name Format</span><span class="closeSeatSelection" style="cursor:pointer;" onClick="closepopover()" ><i class="mdi mdi-close"></i></span></div>',
    content: `<div class="accordion accordion-flush" id="nameformataccordian">
    <div class="accordion-item">
        <h2 class="accordion-header" id="nameformatOne">
            <button class="accordion-button fw-bold" type="button" data-bs-toggle="collapse" data-bs-target="#nameformat-collapseOne" aria-expanded="true" aria-controls="nameformat-collapseOne">Tips on entering name</button>
        </h2>
        <div id="nameformat-collapseOne" class="p-2 accordion-collapse collapse show" aria-labelledby="nameformatOne" data-bs-parent="#nameformataccordian">
            <p>Enter your full name just as it appears on your passport. Use only alphabetical characters (A to Z), with a maximum of 25 characters for your first/given name, and 30 characters for your last/family name.</p>
            <p>Using your passportâ€™s MRZ to correctly fill in your name.</p>
            <p>The Machine Readable Zone (MRZ) is the area on your passport that displays your personal data in a coded format that a machine can identify. It is usually found at the bottom of the biometric page.</p>
            <p>Passport reference name</p>
            <img src="./assets/images/passport.jpg" class="img-fluid mb-2" alt="" title="">
            <p>To find out which should be your first and last name, look for your name within the MRZ. Everything to left of the double chevron (<<) is your last name, and everything to the right is your first name. In the example, â€œLeeâ€ is the last name, while â€œXue Ting Joleneâ€ is the first name.</p>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="nameformatTwo">
            <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#nameformat-collapseTwo" aria-expanded="false" aria-controls="nameformat-collapseTwo">
                Last name is too long?
            </button>
        </h2>
        <div id="nameformat-collapseTwo" class="accordion-collapse collapse" aria-labelledby="nameformatTwo"
            data-bs-parent="#nameformataccordian">
            <div class="accordion-body">
              <p>Enter your full name just as it appears on your passport. Use only alphabetical characters (A to Z), with a maximum of 25 characters for your first/given name, and 30 characters for your last/family name.</p>
              <p>Using your passportâ€™s MRZ to correctly fill in your name.</p>
              <p>The Machine Readable Zone (MRZ) is the area on your passport that displays your personal data in a coded format that a machine can identify. It is usually found at the bottom of the biometric page.</p>
            </div>
        </div>
    </div>
    <div class="accordion-item">
        <h2 class="accordion-header" id="nameformatThree">
            <button class="accordion-button fw-bold collapsed" type="button" data-bs-toggle="collapse"
                data-bs-target="#nameformat-collapseThree" aria-expanded="false" aria-controls="nameformat-collapseThree">
                First name is too long?
            </button>
        </h2>
        <div id="nameformat-collapseThree" class="accordion-collapse collapse" aria-labelledby="nameformatThree"
            data-bs-parent="#nameformataccordian">
            <div class="accordion-body">
              <p>To find out which should be your first and last name, look for your name within the MRZ. Everything to left of the double chevron (<<) is your last name, and everything to the right is your first name. In the example, â€œLeeâ€ is the last name, while â€œXue Ting Joleneâ€ is the first name.</p>
              <p>Using your passportâ€™s MRZ to correctly fill in your name.</p>
              <p>The Machine Readable Zone (MRZ) is the area on your passport that displays your personal data in a coded format that a machine can identify. It is usually found at the bottom of the biometric page.</p>
            </div>
        </div>
    </div>
  </div>`,
    html: true,
    sanitize: false,
  });
  
  document.querySelectorAll(".seatAvailable").forEach((item) => {
      item.addEventListener("show.bs.popover", (event) => {
          $(".seatAvailable").popover("hide");
      });
  
      item.addEventListener("inserted.bs.popover", (event) => {
          const rowseat = event.target.getAttribute("row");
          const colseat = event.target.getAttribute("col");
          $(".seatno").val(`${rowseat}${colseat}`);
          $(".seatnumber").text(`${rowseat}${colseat}`);
      });
  });
  
  $(".layover_info").tooltip({
    title: `<div class="custom-tooltiptext" style="width:300px;">
              <div class="change-terminal">Terminal Change</div>
              <div class="change-terminal"><span>Colombo (COL)</span> | <span><strong>13h 55m </strong> Layover</span></div>
            </div>`,  
    customClass: 'primary-tooltip',
    html: true
  });
  
  });
  function closeSeatSelection() {
    $(".seatAvailable").popover("hide");
  }
  function closepopover() {
    $(".nameformat").popover("hide");
  }
  function closeShareItinerary() {
      $(".shareItinerary").popover("hide");
  }
  
    $('.altMatrix__cell.is--price').hover(
      function(){
        var colval = $(this).attr("col");
        const ids = $('.date-sec.altMatrix__table__cell').map((i, el) => el.getAttribute('col')).get();  
        $.each(ids, function( index, value ) {
          if(colval == value){
            $('.date-sec.altMatrix__table__cell[col=' + colval + ']').addClass("is-active");
          }  
        });
     },
      function(){
        $('.date-sec.altMatrix__table__cell').removeClass("is-active");
      }
    );
  
    // Change pax details at PNR detail page
  
    function toggleReadonly() {
      var emailField = document.getElementById('pax-email');
              var phoneField = document.getElementById('pax-number');
              var editButton = document.getElementById('editButton');
  
              // Toggle readonly attribute
              emailField.readOnly = !emailField.readOnly;
              phoneField.readOnly = !phoneField.readOnly;
  
              // Toggle class for highlighting
              emailField.classList.toggle('editable', !emailField.readOnly);
              phoneField.classList.toggle('editable', !phoneField.readOnly);
  
              // Change button text based on readonly state
              editButton.textContent = emailField.readOnly ? 'Edit Details' : 'Update Details';
  
   }