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
        <!DOCTYPE html>
        <html lang="en" >
            <head>
                <meta charset="utf-8" />
                <title>Dashboard | Airlink Services Group</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta content="Transform your travel consolidation with our efficient platform. As a reliable consolidator, access exclusive deals, streamline operations, and boost profitability. Elevate your business with our innovative tools, connecting you to a world of travel opportunities." name="description" />
                <meta content="Airlink Services Group" name="author" />

                <!-- App favicon -->
                <link rel="shortcut icon" href="/images/favicon.ico">

                <!-- Theme Config Js -->
                <script src="/js/hyper-config.js"></script>

                <!-- App css -->
                <link href="/css/app-saas.css" rel="stylesheet" type="text/css" id="app-style" />
                <link href="/css/custom.css" rel="stylesheet" type="text/css" id="app-style" />

                <!-- Icons css -->
                <link href="/css/icons.min.css" rel="stylesheet" type="text/css" />
                
                <!-- Daterangepicker css -->
                <link href="/vendor/daterangepicker/daterangepicker.css" rel="stylesheet" type="text/css" />
                
                <!-- Bootstrap Touchspin css -->
                <link href="/vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.css" rel="stylesheet" type="text/css" />
                
                <!-- Vendor js -->
                <script src="/js/vendor.min.js"></script>

                <!-- pra -->
                <script src="/js/ui/const.js"></script>
            </head>

            <body>
            
                <!-- Pre-loader -->
                <div id="preloader">
                    <div id="status">
                        <div class="bouncing-loader"><div ></div><div ></div><div ></div></div>
                    </div>
                </div>
                <!-- End Preloader-->

                <!-- Begin page -->
                <div class="wrapper">
                <!-- ========== Topbar Start ========== -->
                    <div class="navbar-custom">
                        <div class="topbar container-fluid">
                            <div class="d-flex align-items-center gap-lg-2 gap-1">
        
                                <!-- Topbar Brand Logo -->
                                <div class="logo-topbar">
                                    <!-- Logo light -->
                                    <a href="index.html" class="logo-light">
                                        <span class="logo-lg">
                                            <img src="/images/logo.png" alt="logo">
                                        </span>
                                        <span class="logo-sm">
                                            <img src="/images/logo-sm.png" alt="small logo">
                                        </span>
                                    </a>
        
                                    <!-- Logo Dark -->
                                    <a href="index.html" class="logo-dark">
                                        <span class="logo-lg">
                                            <img src="/images/logo-dark.png" alt="dark logo">
                                        </span>
                                        <span class="logo-sm">
                                            <img src="/images/logo-dark-sm.png" alt="small logo">
                                        </span>
                                    </a>
                                </div>
        
                                <!-- Sidebar Menu Toggle Button -->
                                <button class="button-toggle-menu">
                                    <i class="mdi mdi-menu"></i>
                                </button>
        
                                <!-- Horizontal Menu Toggle Button -->
                                <button class="navbar-toggle" data-bs-toggle="collapse" data-bs-target="#topnav-menu-content">
                                    <div class="lines">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </div>
                                </button>
        
                                <!-- Topbar Search Form -->
                                <div class="app-search dropdown d-none d-lg-block">
                                    <form>
                                        <div class="input-group">
                                            <input type="search" class="form-control" placeholder="Search PNR" id="top-search">
                                            <span class="mdi mdi-magnify search-icon"></span>
                                        </div>
                                    </form>
                                </div>
                            </div>
        
                            <ul class="topbar-menu d-flex align-items-center gap-3">
                                <li class="dropdown d-lg-none">
                                    <a class="nav-link dropdown-toggle arrow-none" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        <i class="ri-search-line font-22"></i>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-animated dropdown-lg p-0">
                                        <form class="p-3">
                                            <input type="search" class="form-control" placeholder="Search PNR" aria-label="Search PNR">
                                        </form>
                                    </div>
                                </li>
        
                                <li class="d-none d-sm-inline-block">
                                    <div class="nav-link" id="light-dark-mode" data-bs-toggle="tooltip" data-bs-placement="left" title="Theme Mode">
                                        <i class="ri-moon-line font-22"></i>
                                    </div>
                                </li>
        
        
                                <li class="d-none d-md-inline-block">
                                    <a class="nav-link" href="" data-toggle="fullscreen">
                                        <i class="ri-fullscreen-line font-22"></i>
                                    </a>
                                </li>
        
                                <li class="dropdown">
                                    <a class="nav-link dropdown-toggle arrow-none nav-user px-2" data-bs-toggle="dropdown" href="#" role="button" aria-haspopup="false" aria-expanded="false">
                                        <span class="account-user-avatar">
                                            <img src="/images/users/avatar-1.jpg" alt="user-image" width="32" class="rounded-circle">
                                        </span>
                                        <span class="d-lg-flex flex-column gap-1 d-none">
                                            <h5 class="my-0">Dominic Keller</h5>
                                            <h6 class="my-0 fw-normal">Founder</h6>
                                        </span>
                                    </a>
                                    <div class="dropdown-menu dropdown-menu-end dropdown-menu-animated profile-dropdown">
                                        <!-- item-->
                                        <div class=" dropdown-header noti-title">
                                            <h6 class="text-overflow m-0">Welcome !</h6>
                                        </div>
        
                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item">
                                            <i class="mdi mdi-account-circle me-1"></i>
                                            <span>My Account</span>
                                        </a>
        
                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item">
                                            <i class="mdi mdi-account-edit me-1"></i>
                                            <span>Settings</span>
                                        </a>
        
                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item">
                                            <i class="mdi mdi-lifebuoy me-1"></i>
                                            <span>Support</span>
                                        </a>
        
                                        <!-- item-->
                                        <a href="javascript:void(0);" class="dropdown-item">
                                            <i class="mdi mdi-logout me-1"></i>
                                            <span>Logout</span>
                                        </a>
                                    </div>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <!-- ========== Topbar End ========== -->
        
                    <!-- ========== Left Sidebar Start ========== -->
                    <div class="leftside-menu">
        
                        <!-- Brand Logo Light -->
                        <a href="index.html" class="logo logo-light">
                            <span class="logo-lg">
                                <img src="/images/logo.png" alt="logo">
                            </span>
                            <span class="logo-sm">
                                <img src="/images/logo-sm.png" alt="small logo">
                            </span>
                        </a>
        
                        <!-- Brand Logo Dark -->
                        <a href="index.html" class="logo logo-dark">
                            <span class="logo-lg">
                                <img src="/images/logo-dark.png" alt="dark logo">
                            </span>
                            <span class="logo-sm">
                                <img src="/images/logo-dark-sm.png" alt="small logo">
                            </span>
                        </a>
        
                        <!-- Sidebar Hover Menu Toggle Button -->
                        <div class="button-sm-hover" data-bs-toggle="tooltip" data-bs-placement="right" title="Show Full Sidebar">
                            <i class="ri-checkbox-blank-circle-line align-middle"></i>
                        </div>
        
                        <!-- Full Sidebar Menu Close Button -->
                        <div class="button-close-fullsidebar">
                            <i class="ri-close-fill align-middle"></i>
                        </div>
        
                        <!-- Sidebar -left -->
                        <div class="h-100" id="leftside-menu-container" data-simplebar>
                            <ul id="mainNav" class="side-nav" ></ul>
                    
                            <div class="clearfix"></div>
                        </div>
                    </div>
                    <!-- ========== Left Sidebar End ========== -->
        
                    <!-- ============================================================== -->
                    <!-- Start Page Content here -->
                    <!-- ============================================================== -->
                    <div class="content-page">
                        <div class="content">
                            ${content}
                        </div>
                    </div>
                    <!-- ============================================================== -->
                    <!-- End Page content -->
                    <!-- ============================================================== -->
                </div>
                <!-- END wrapper -->

               

                <!-- Bootstrap Touchspin Plugin js -->
                <script src="/vendor/bootstrap-touchspin/jquery.bootstrap-touchspin.min.js"></script>
                    <!-- Daterangepicker Plugin js -->
                    <script src="/vendor/daterangepicker/moment.min.js"></script>
                    <script src="/vendor/daterangepicker/daterangepicker.js"></script>

                    <!-- Plgins only -->
                <script src="/vendor/ion-rangeslider/js/ion.rangeSlider.min.js"></script>
                <script src="/js/ui/component.range-slider.js"></script>
                <!-- Apex Charts js -->
                

                <!-- Vector Map js -->
                <script src="/vendor/admin-resources/jquery.vectormap/jquery-jvectormap-1.2.2.min.js"></script>
                <script src="/vendor/admin-resources/jquery.vectormap/maps/jquery-jvectormap-world-mill-en.js"></script>

           
                <!-- App js -->
                <script src="/js/app.js"></script>
                <script src="/js/custom.js"></script>
                <script src="/js/main.js"></script>
                
                <script>
                    renderGroupedNavigationMenu(${JSON.stringify(_interface)});
                </script>
                
                
            </body>
        </html>
        `;
    }
}