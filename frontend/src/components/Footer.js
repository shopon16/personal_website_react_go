function Footer(){
    return(
        <>
        <footer id="footer">
          <div className="container">
            <div className="footer-container">
              <div className="social">
                <div>
                  <a href="https://twitter.com/victorekea">
                    <img src="https://img.shields.io/twitter/follow/evavic44?label=Twitter&logo=twitter&style=for-the-badge" alt="Twitter badge" />
                  </a>
                </div>
                <div>
                  <a href="https://github.com/evavic44?tab=followers">
                    <img src="https://img.shields.io/github/followers/evavic44?label=Followers&logo=GitHub&style=for-the-badge" alt="GitHub badge" />
                  </a>
                </div>
              </div>
              <p>Copyright © Eke Victor 2021, All rights reserved</p>
              <a href="#home" className="btn-scroll-top" title="Home"><span className="fas fa-angle-up" /></a>
            </div>
          </div>
        </footer>
        </>
    );
}
export default Footer;