//const head = require('./head')
//const header = require('./header')

module.exports = {

    html_doc: (req, res, next, content) => {
        
    // prepare mainNav
        var mainNav = ``;

        var _interface = req.session.interface;

        const groupedItems = {};
        _interface.forEach(item => {
            const group = item.group || "Other"; // Default to "Other" if no group is specified
            if (!groupedItems[group]) {
                groupedItems[group] = [];
            }
            groupedItems[group].push(item);
        });

        return `
        <!doctype html>
        <html lang="en">
            <head>
                <link rel="icon" href="data:;base64,iVBORw0KGgo=">
                <meta charset="utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1">
                <title>Airlink</title>
                <link rel="stylesheet" href="/stylesheets/5.3.0-alpha3_dist_css_bootstrap.min.css">
                <link rel="stylesheet" href="/stylesheets/font-awesome_6.3.0_css_all.min.css">
                <link rel="stylesheet" href="/stylesheets/style.css">
                <link rel="stylesheet" href="/stylesheets/theme.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.3.0/css/all.min.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.min.css">
                <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.13.2/themes/base/jquery-ui.min.css">
                <script src="/javascripts/5.3.0-alpha3_dist_js_bootstrap.bundle.min.js"></script>
                <script src="https://code.jquery.com/jquery-3.6.1.min.js"></script>
                <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
                <script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
                <script src="/javascripts/search.js"></script>
            </head>
            <body>
                <header>
               
                <nav class="navbar navbar-expand-sm fixed-top shadow bg-white p-0">
                    <div class="container-fluid custom-header">   
                        <img src="/images/airlink-logo.jpg" width="150" alt="Airlink" class="img-fluid">
                        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarCollapse">
                        <span class="navbar-toggler-icon"></span>
                        </button>
                        <div class="collapse navbar-collapse" id="navbarCollapse">
                            
                        <form class="d-flex ms-auto" role="search">
                            <input class="form-control form-control-sm me-2" type="text" placeholder="Search PNR">
                            <button class="btn btn-primary d-none" type="button"><i class="fa-solid fa-magnifying-glass"></i></button>
                        </form>
                        <div class="hsearch-flight">
                            <a class="btn-search"><i class="fa-solid fa-magnifying-glass"></i> Search Flight</a>
                        </div> 
                        <ul class="navbar-nav mb-2 mb-md-0">
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                <i class="fa-regular fa-circle-user me-2"></i>Account
                                </a>
                                <ul class="dropdown-menu dropdown-menu-end">
                                    <li class="dropdown-item">Mital Patel</li>
                                    <li><hr class="dropdown-divider"></li>
                                    <li><a class="dropdown-item" href="#">Profile</a></li>
                                    <li><a class="dropdown-item" href="#">LogOut</a></li>
                                </ul>
                            </li>
                        </ul> 
                        <div class="v-menu" data-bs-toggle="offcanvas" data-bs-target="#vmenu">
                        <i class="fa-solid fa-bars"></i>
                        </div>   
                        </div>
                    </div>
                </nav>
                <div class="offcanvas offcanvas-end vmenu" id="vmenu">
                <div class="offcanvas-header justify-content-end">
                    <button type="button" class="btn-close1" data-bs-dismiss="offcanvas"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="offcanvas-body vmenu-body p-0">
                <div class="d-flex flex-column justify-content-between h-100 ">
                    <ul id="mainNav" class=" p-4 list-unstyled menuList" >
                    </ul>
                    <hr>
                    <ul class="p-4 list-unstyled menuList">
                        <li class="mb-4">
                            <a class="d-flex align-items-center">
                                <i class="fa-regular fa-flag pe-2"></i>Reports
                            </a>       
                        </li>
                        <li class="mb-4">
                            <a class="btn-toggle d-flex align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#dashboard-collapse" aria-expanded="false">
                                <i class="fa-solid fa-chart-line pe-2"></i>Dashboard
                            </a>
                            <div class="collapse" id="dashboard-collapse">
                                <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                    <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none align-items-center"><i class="fa-solid fa-caret-right me-2"></i>Overview</a></li>
                                    <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none align-items-center"><i class="fa-solid fa-caret-right me-2"></i>Updates</a></li>
                                    <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none align-items-center"><i class="fa-solid fa-caret-right me-2"></i>Reports</a></li>
                                </ul>
                            </div>
                        </li>
                        <li class="mb-4">
                            <a class="btn-toggle d-flex align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#searchflight-collapse" aria-expanded="false">
                            <i class="fa-solid fa-magnifying-glass pe-2"></i>Search Flights
                            </a>
                            <div class="collapse" id="searchflight-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none align-items-center"><i class="fa-solid fa-caret-right me-2"></i>Overview</a></li>
                                <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none align-items-center"><i class="fa-solid fa-caret-right me-2"></i>Weekly</a></li>
                                <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none align-items-center"><i class="fa-solid fa-caret-right me-2"></i>Monthly</a></li>
                                <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none align-items-center"><i class="fa-solid fa-caret-right me-2"></i>Annually</a></li>
                            </ul>
                            </div>
                        </li>
                        <li class="mb-4">
                            <a class="btn-toggle d-flex align-items-center collapsed" data-bs-toggle="collapse" data-bs-target="#tdetail-collapse" aria-expanded="false">
                            <i class="fa-solid fa-person-walking-luggage pe-2"></i>Traveller Details
                            </a>
                            <div class="collapse" id="tdetail-collapse">
                            <ul class="btn-toggle-nav list-unstyled fw-normal pb-1 small">
                                <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none align-items-center"><i class="fa-solid fa-caret-right me-2"></i>Traveller List</a></li>
                                <li><a href="#" class="link-body-emphasis d-inline-flex text-decoration-none align-items-center"><i class="fa-solid fa-caret-right me-2"></i>Processed</a></li>
                            </ul>
                            </div>
                        </li>
                           
                    </ul>
                    <div class="menu-other-info border-top p-4 bg-light">
                    <div class="d-flex menu-other-sec">
                        <i class="bi bi-telephone-fill pe-2"></i>
                        <div class="other-div">
                        <div class="fw-semibold">24×7 Customer Support</div>
                        <p class="m-0"><a href="tel:(+61) 25698745">(+61) 25698745</a></p>
                        </div>   
                    </div>  
                        <div class="d-flex menu-other-sec mt-4">
                        <i class="bi bi-envelope-fill pe-2"></i>
                        <div class="other-div">
                            <div class="fw-semibold">Email us </div>
                            <p class="m-0"><a href="mailto:support@airlink.com">support@airlink.com</a></p>
                        </div>   
                        </div> 
                </div>
                </div>
                            
                </div>
                </div>      
                
                </header>
                ${content}

                <script>
                    renderGroupedNavigationMenu(${JSON.stringify(_interface)});

              
                </script>
            </body>
        </html>
        `;
    }
}