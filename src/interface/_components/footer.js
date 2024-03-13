module.exports = {
    footer: (req, res, next) =>
        `
        <!-- Footer Start -->
        <footer class="footer">
            <div class="container-fluid">
                <div class="row">
                    <div class="col-md-6">
                        <script>document.write(new Date().getFullYear())</script> © AIRLINK. All rights reserved.
                    </div>
                    <div class="col-md-6">
                        <div class="text-md-end footer-links d-none d-md-block">
                            <a href="https://www.airlinkservicesgroup.com.au/about-us.html" target="_blank">About Us</a>
                            <a href="https://www.airlinkservicesgroup.com.au/contact-us.html" target="_blank">Contact Us</a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        `
}