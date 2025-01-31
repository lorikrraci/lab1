import React from 'react';

export const Footer = () => {
    return (
        <footer 
            style={{
                backgroundColor: '#000',
                color: '#fff',
                padding: '10px 20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            {/* Left Section: Logo and Title */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <img 
                    src="./images/KB-Vellaznimi-logo.png" 
                    alt="KB Vëllaznimi" 
                    style={{ height: '40px', marginRight: '10px' }}
                />
                <h3 style={{ margin: 0, fontWeight: 'bold' }}>KB VËLLAZNIMI</h3>
            </div>

            {/* Right Section: Copyright */}
            <div>
                <p style={{ margin: 0, fontWeight: 'bold' }}>
                    © ALL RIGHTS RESERVED 2025
                </p>
            </div>
        </footer>
    );
};

export default Footer;
