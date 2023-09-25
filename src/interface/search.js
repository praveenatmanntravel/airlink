const SIA = require('./_/providers/SIA/')
const { html_doc } = require('./_components/html_doc')
module.exports = {
  index: (req, res, next) => {
    console.log('in search interface, do:index')
    res.send('index')
  },
  view: (req, res, next) => {
    console.log('in search interface, do:view')
    var _content = `
       
  <main class="main-content pt-5 pb-5" >
  
  <section class="flight-search-sec">
  <div class="flight-search bg-secondary py-5">
    <div class="container">
      <form id="flightsearch">
        <div class="row pb-3">
          <div class="col-md-9 select-journey">
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="journeytype" id="oneway" value="oneway" checked="" autocomplete="off">
              <label class="form-check-label" for="oneway">One-way</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="journeytype" id="rJournyCheck1" value="return" autocomplete="off">
              <label class="form-check-label" for="rJournyCheck">Return-</label>
            </div>
            <div class="form-check form-check-inline">
              <input class="form-check-input" type="radio" name="journeytype" id="multicity" value="multicity" autocomplete="off">
              <label class="form-check-label" for="multicity">Multi-city</label>
            </div>
            <a class="btn btn-outline-white font-small addcity journeytypemulticity" id="addcity" style="">
              <i class="fa-solid fa-plus pe-1"></i><span class="fw-bold">Add City</span>
            </a>
          </div>
          <div class="col-md-3 travellerno">
            <div class="dropdown" id="myDD">
              <button class="dropdown-toggle form-control" type="button" id="travellerInfoOneway" data-bs-toggle="dropdown" aria-expanded="false">
                  <i class="bi bi-person-lines-fill position-absolute h5 icon-pos"></i>
                  <span class="ps-5 text-truncate">1 Traveller(s), Economy </span>
              </button>
              <div class="dropdown-menu" aria-labelledby="travellerInfoOneway" style="">
                <h6 class="border-bottom pt-3 pb-2 fw-bold">Select Traveller</h6>
                  <ul class="drop-rest">
                      <li>
                          <div class="d-flex">Select Adults</div>
                          <div class="ms-auto input-group plus-minus-input">
                              <div class="input-group-button">
                                  <button type="button" class="circle" data-quantity="minus" data-field="onewayAdult">
                                      <i class="bi bi-dash"></i>
                                  </button>
                              </div>
                              <input class="input-group-field" type="number" name="onewayAdult" value="1">
                              <div class="input-group-button">
                                  <button type="button" class="circle" data-quantity="plus" data-field="onewayAdult">
                                      <i class="bi bi-plus"></i>
                                  </button>
                              </div>
                          </div>
                      </li>
                      <li>
                          <div class="d-flex">Select Child</div>
                          <div class="ms-auto input-group plus-minus-input">
                              <div class="input-group-button">
                                  <button type="button" class="circle" data-quantity="minus" data-field="onewayChild">
                                      <i class="bi bi-dash"></i>
                                  </button>
                              </div>
                              <input class="input-group-field" type="number" name="onewayChild" value="0">
                              <div class="input-group-button">
                                  <button type="button" class="circle" data-quantity="plus" data-field="onewayChild">
                                      <i class="bi bi-plus"></i>
                                  </button>
                              </div>
                          </div>
                      </li>
                      <li>
                          <div class="d-flex">Select Infants</div>
                          <div class="ms-auto input-group plus-minus-input">
                              <div class="input-group-button">
                                  <button type="button" class="circle" data-quantity="minus" data-field="onewayInfant">
                                      <i class="bi bi-dash"></i>
                                  </button>
                              </div>
                              <input class="input-group-field" type="number" name="onewayInfant" value="0">
                              <div class="input-group-button">
                                  <button type="button" class="circle" data-quantity="plus" data-field="onewayInfant">
                                      <i class="bi bi-plus"></i>
                                  </button>
                              </div>
                          </div>
                      </li>
                    </ul>
                    <h6 class="border-bottom pb-2 pt-3 fw-bold">Select Fare Type</h6>
                    <ul class="drop-rest">
                      <li>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="faretype" id="economy" value="economy" checked="">
                          <label class="form-check-label" for="economy">Economy</label>
                        </div>                          
                      </li>
                      <li>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="faretype" id="special" value="special">
                          <label class="form-check-label" for="special">Premium Economy</label>
                        </div>                      
                      </li>
                      <li>
                        <div class="form-check form-check-inline">
                          <input class="form-check-input" type="radio" name="faretype" id="business" value="business">
                          <label class="form-check-label" for="business">Business</label>
                        </div>                            
                      </li>                     
                      <li>
                          <button type="button" class="btn btn-primary" onclick="">Done</button>
                      </li>
                    </ul>
              </div>
          </div>
          </div>       
        </div>
          <div class="row search-form">           
              <div class="col-12 search-pan rounded">
                <div class="formSection">
                  <div class="row mx-0 theme-border-radius">
                    <div class="col-12 col-md-4 ps-0 mb-2 mb-xl-0 pe-0 pe-lg-2">
                        <div class="form-group">
                          <i class="fa-solid fa-plane-departure h5 position-absolute"></i>
                            <input type="text" name="origin" class="form-control ps-5" placeholder="Origin" selected="">                                  
                        </div>
                    </div>
                    <div class="col-12 col-md-4 ps-0 mb-2 mb-xl-0 pe-0 pe-lg-2">
                        <div class="form-group">
                            <i class="fa-solid fa-plane-arrival h5 position-absolute"></i>
                            <input type="text" name="destination" class="form-control ps-5" placeholder="Destination">
                        </div>
                    </div>
                    <div class="col-12 col-md-4 ps-0 mb-2 mb-xl-0 pe-0 pe-lg-0 pe-xl-2 d-flex">
                        <div class="form-group pe-xl-2 w-100">
                          <i class="fa-regular fa-calendar-days h5 position-absolute"></i>
                            <span class="dep-date-input">
                                <input type="text" name="ddate" class="form-control ps-5 cal-input datepicker" placeholder="Depart Date">
                            </span>
                        </div>
                        <div class="form-group journeytypereturn w-100" style="display: none;">
                          <i class="fa-regular fa-calendar-days h5 position-absolute"></i>
                            <span class="dep-date-input">
                                <input type="text" class="form-control ps-5 cal-input datepicker" name="rdate" placeholder="Return Date">
                            </span>
                        </div>
                    </div>       
                  </div>
                  <!-- repeated for multicity -->
                  
                </div>                          
              </div>
              
              <div class="col-12 mt-4">
                  <div class="d-flex align-items-center">
                          <div class="form-check-inline">
                              <label class="check-wrap">Refundable Flights
                                  <input type="checkbox">
                                  <span class="checkmark"></span> </label>
                          </div>
                          <div class="form-check-inline">
                              <label class="check-wrap"> Non Stop Flights
                                  <input type="checkbox">
                                  <span class="checkmark"></span> </label>
                          </div>
                          <div class="form-check-inline">
                              <label class="check-wrap"> GDS Special Return
                                  <input type="checkbox">
                                  <span class="checkmark"></span> </label>
                          </div>
                          <div class="btn-sec ms-auto justify-content-between align-items-center">                             
                            <button type="submit" class="btn btn-search btn-gradient ms-auto">
                              <i class="fa-solid fa-magnifying-glass pe-2"></i>
                                <span class="fw-bold">Search</span>
                            </button>
                        </div>
                  </div>
              </div>
          </div>
      </form>
        

    </div>
</div>
</section>


    <div class="container-fluid bg-body-secondary bg-gradient shadow p-3 my-5 rounded-3 ">
      <form id="searchFlight" action="${req?.params?.interface}/getResult" post="" >
        <div class="d-flex flex-row justify-content-between justify-content-md-start gap-2  gap-md-5 border-bottom border-primary-subtle align-items-center">
          <h3 class="fw-bold"><i class="fa-solid fa-magnifying-glass-arrow-right text-danger"></i> Flight Search</h3>
          <select class="my-1 " aria-label="Default select example" name="gds">
            <optgroup label="GDS">
              <option value="Galileo">Galileo</option>
              <option value="Amadeus">Amadeus</option>
            </optgroup>
            <optgroup label="NDC">
              <option value="SIA">SIA</option>
            </optgroup>
          </select>
          <div class="form-check form-switch">
            <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
            <label class="form-check-label" for="flexSwitchCheckDefault">MultiCity</label>
          </div>
        </div>

        <div class="row mt-2 mt-md-3">
          <div class="col-md-auto">
            <div class="row">
              <div class="col-8">
                <label class="form-label">From Airport</label>
                <input type="text" class="form-control form-control-sm airportInput" name="from" value="SIN - Singapore - Changi" required>
              </div>
              <div class="col-4">
                <label class="form-label">Dept. Date</label>
                <input type="text" class="form-control form-control-sm datepicker" name="departure" required
                  autocomplete="off">
              </div>
            </div>
          </div>

          <div class="col-md-auto">
            <div class="row">
              <div class="col-8">
                <label class="form-label">Destination Airport</label>
                <input type="text" class="form-control form-control-sm airportInput" name="destination" value="LAX - Los Angeles CA - International" required>
              </div>
              <div class="col-4">
                <div class="form-check form-switch my-1">
                  <input class="form-check-input" type="checkbox" role="switch" id="rJournyCheck" onChange="returnJournyAdjust()">
                  <label class="form-check-label" for="rJournyCheck">ReturnDate</label>
                </div>
                <input type="text" class="form-control form-control-sm datepicker" name="return" id="rJournyInput"
                  autocomplete="off" disabled='true'>
              </div>
            </div>
          </div>
       
          <div class="col-md-auto">
            <label class="form-label">Travel Class</label>
            <select class="form-select form-select-sm" name="tClass" required>
              <option value="ECO">Economy</option>
              <option value="PRE">Premium Economy</option>
              <option value="BUS">Business</option>
              <option value="FIR">First Class</option>
            </select>
          </div>
          <div class="col-auto">
            <label class="form-label">Adults</label>
            <select class="form-select form-select-sm" name="nAdult">
              <option disabled>12 Years +</option>
              <option selected>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div class="col-auto">
            <label class="form-label">Children</label>
            <select class="form-select form-select-sm" name="nChild">
              <option disabled>(2 to 12 Years )</option>
              <option selected>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div class="col-auto">
            <label class="form-label">Infants</label>
            <select class="form-select form-select-sm" name="nInfant">
              <option disabled>(0 to 2 Years)</option>
              <option selected>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
            </select>
          </div>
          <div class="col-auto ">
            <label class="form-label">-</label>
            <button type="submit" class="btn btn-sm btn-danger w-100 "> <i class="fa-solid fa-paper-plane"></i>
              Search</button>
          </div>
        </div>
      </form>
    </div>
<div class="" id="f_s_placholder" ></div>
<div class="" id="seg_placholder" ></div>

    <section class="container-xxl bg-body-secondary bg-gradient shadow p-3 my-5 rounded-3 ">
      <div
        class="d-flex flex-row justify-content-between justify-content-md-start gap-2  gap-md-5 border-bottom border-primary-subtle align-items-center">
        <h3 class="fw-bold"><i class="fa-solid fa-plane-circle-check text-danger"></i> Result</h3>
        <select class="my-1 " aria-label="Default select example">
          <optgroup label="GDS">
            <option value="Galileo">Galileo</option>
            <option value="Amadeus">Amadeus</option>
          </optgroup>
          <optgroup label="NDC">
            <option value="SIA">SIA</option>
          </optgroup>
        </select>
        <div class="form-check form-switch">
          <input class="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault">
          <label class="form-check-label" for="flexSwitchCheckDefault">MultiCity</label>
        </div>
      </div>
      <style>
        div.accordion-item {
          margin-top: 11px;
        }
      </style>
      <div class="accordion accordion-flush" id="accordionFlushExample">
        <div class="accordion-item">
          <div class="accordion-header">
            <div class="row mx-0">
              <div class="col-12 col-md-4 bg-primary-subtle">

                <b>Srilankan Airlines</b>
                <div class="d-flex flex-row gap-3 ">
                  <div><i class="fa-solid fa-plane-departure text-primary"></i> DEL 23:45</div>
                  <div><i class="fa-solid fa-plane-arrival text-primary"></i> MEL 05:45</div>
                  <div><i class="fa-solid fa-clock text-primary"></i> 12h:40M</div>
                </div>

              </div>
              <div class="col-12 col-md-4 bg-info-subtle">

                <b>Srilankan Airlines</b>
                <div class="d-flex flex-row gap-3 ">
                  <div><i class="fa-solid fa-plane-departure text-primary"></i> DEL 23:45</div>
                  <div><i class="fa-solid fa-plane-arrival text-primary"></i> MEL 05:45</div>
                  <div><i class="fa-solid fa-clock text-primary"></i> 12h:40M</div>
                </div>

              </div>
              <div class="col-12 col-md-4 bg-danger-subtle ">

                <div class="d-flex flex-row gap-3 align-items-center align-middle ">
                  <div class="d-flex flex-column gap-1" style="font-size:10px">
                    <div>ADT 1208.45 X 3 = <b>2222.88</b></div>
                    <div>CHD 1208.45 X 3 = <b>2222.88</b></div>
                    <div>INF 1208.45 X 3 = <b>2222.88</b></div>
                  </div>
                  <div class="vr"></div>

                  <div class="d-flex flex-column gap-1" style="font-size:10px">
                    <div class="fw-bold"> 1208.82 </div>
                    <button class="collapsed btn btn-sm btn-outline-danger" type="button" data-bs-toggle="collapse"
                      data-bs-target="#flush-collapseOne">
                      view more
                    </button>
                  </div>
                </div>

              </div>
            </div>
          </div>
          <div id="flush-collapseOne" class="accordion-collapse collapse">
            <div class="accordion-body">
              <p class="text-danger"> fare Policy</p>
              <p class="text-danger">Baggage Policy</p>
              <p class="text-info"> Travel Conditions</p>
              <button type="button" class="btn btn-sm btn-primary ms-auto" data-bs-toggle="modal"
                data-bs-target="#PaxInput">
                Add Pax
              </button>

            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
              Accordion Item #2
            </button>
          </h2>
          <div id="flush-collapseTwo" class="accordion-collapse collapse">
            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the
              <code>.accordion-flush</code> class. This is the second item's accordion body. Let's imagine this being
              filled with some actual content.
            </div>
          </div>
        </div>
        <div class="accordion-item">
          <h2 class="accordion-header">
            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse"
              data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
              Accordion Item #3
            </button>
          </h2>
          <div id="flush-collapseThree" class="accordion-collapse collapse">
            <div class="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the
              <code>.accordion-flush</code> class. This is the third item's accordion body. Nothing more exciting
              happening here in terms of content, but just filling up the space to make it look, at least at first
              glance, a bit more representative of how this would look in a real-world application.
            </div>
          </div>
        </div>
      </div>

    </section>

  </main>
  <!-- Modal -->
  <div class="modal" id="PaxInput" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-hidden="true">
    <div class="modal-dialog modal-lg modal-dialog-scrollable">
      <div class="modal-content">
        <!--
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="staticBackdropLabel">Pax Details</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        -->
        <div class="modal-body">

        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Create PNR</button>
        </div>
      </div>
    </div>
  </div>

        
        `
    var html = html_doc(req, res, next, _content)
    res.send(html)
  },
  getResult: async (req, res, next) => {
    var search_param = req.body;
    //return res.json(search_param);
    var response = await SIA.AirShopping(search_param)
    console.log('in search interface, do:search', response)
    res.json(response)
  }
}