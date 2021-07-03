import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import '../index.css'

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-top">
                <Container>
                    <Row className="footer__row">
                        <Col md={3} sm={4} xs={6}>
                            <h3 className="footer__heading">
                                CHĂM SÓC KHÁCH HÀNG
                            </h3>
                            <ul className="footer__list">
                                <li className="footer__item">
                                    <a href="/#" className="footer__item-link">Trung Tâm Trợ Giúp</a>
                                </li>
                                <li className="footer__item">
                                    <a href="/#" className="footer__item-link">Hướng Dẫn Mua Hàng</a>
                                </li>
                                <li className="footer__item">
                                    <a href="/#" className="footer__item-link">Chính Sách Vận Chuyển</a>
                                </li>
                            </ul>
                        </Col>
                        <Col md={3} sm={4} xs={6}>
                            <h3 className="footer__heading">
                                VỀ CHÚNG TÔI
                            </h3>
                            <ul className="footer__list">
                                <li className="footer__item">
                                    <a href="/#" className="footer__item-link">Giới Thiệu Về PNJ</a>
                                </li>
                                <li className="footer__item">
                                    <a href="/#" className="footer__item-link">Chính Sách Thanh Toán</a>
                                </li>
                                <li className="footer__item">
                                    <a href="/#" className="footer__item-link">Điều Khoản Chính Sách</a>
                                </li>
                            </ul>
                        </Col>
                        <Col md={3} sm={4} xs={6}>
                            <h3 className="footer__heading">
                                THEO DÕI
                            </h3>
                            <ul className="footer__list">
                                <li className="footer__item">
                                    <a href="/#" className="footer__item-link">
                                        <i className="footer__item-icon fab fa-facebook"></i>
                                        <span>Facebook</span>
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a href="/#" className="footer__item-link">
                                        <i className="footer__item-icon fab fa-instagram"></i>
                                        <span>Instagram</span>
                                    </a>
                                </li>
                                <li className="footer__item">
                                    <a href="/#" className="footer__item-link">
                                        <i className="footer__item-icon fab fa-linkedin"></i>
                                        <span>Linkedin</span>
                                    </a>
                                </li>
                            </ul>
                        </Col>
                        <Col md={3} sm={4} xs={6}>
                            <h3 className="footer__heading">
                                VÀO CỬA HÀNG TRÊN ỨNG DỤNG
                            </h3>
                            <div className="footer__qr-code-apps">
                                <a href="/#" className="footer__item-link">
                                    <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/1200px-QR_code_for_mobile_English_Wikipedia.svg.png" alt="QR_Code" className="footer__item-qr"/>
                                </a>
                                <div className="footer__apps">
                                    <a href="/#" className="footer__item-link">
                                        <img src="https://w7.pngwing.com/pngs/822/688/png-transparent-apple-on-the-app-store-screenshot-iphone-app-store-google-play-store-electronics-text-logo.png" alt="App_store" className="footer__item-apps" />
                                    </a>
                                    <a href="/#" className="footer__item-link">
                                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Google_Play_Store_badge_EN.svg/1024px-Google_Play_Store_badge_EN.svg.png" alt="Google_play" className="footer__item-apps" />
                                    </a>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <div className="footer-bottom-1">
                <Container>
                    <Row>
                        <Col className="text-center py-3">Copyright &copy; Shop Hải Anh</Col>
                    </Row>
                </Container>
            </div>
        </footer>
    )
}

export default Footer
