import "./Footer.css";

const footerData = [
    {
        title: "INFO",
        items: ["Formats", "Compression", "Pricing"],
    },
    {
        title: "HELP",
        items: ["FAQ", "Status"],
    },
    {
        title: "RESOURCES",
        items: ["Developer API", "Tools", "Blog"],
    },
    {
        title: "COMPANY",
        items: ["About Us", "Sustainability", "Terms of Service", "Privacy"],
    },
    {
        title: "PLATFORMS",
        items: ["iOS", "Android", "Web Extension"],
    },
    ];

    const Footer = () => {
    return (
        <footer className="site-footer py-5">
            <div className="container">

                <div className="row gy-4 row-cols-2 row-cols-md-3 row-cols-lg-5">
                    {footerData.map(({ title, items }) => (
                        <div key={title}>
                        <h6 className="footer-title">{title}</h6>
                        <ul className="footer-list">
                            {items.map((item) => (
                            <li key={item}>{item}</li>
                            ))}
                        </ul>
                        </div>
                    ))}
                </div>

                <hr className="footer-divider my-4" />

                <p className="text-center footer-copy mb-0">
                © 2006 – 2026 Ltd · All Rights Reserved
                </p>
            </div>
        </footer>
    );
};

export default Footer;
