import Footer from './Footer';
import Header from './Header';

const LayoutWrapper = ({ layout, children }) => {
    switch (layout) {
        case "noHeaderFooterPaths":
            return children
        default:
            return <>
                <Header />
                {children}
                <Footer />
            </>
    }
};

export default LayoutWrapper;
