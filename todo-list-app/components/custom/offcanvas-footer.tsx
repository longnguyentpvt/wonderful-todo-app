export type FooterProps = {
  children?: React.ReactNode | React.ReactNode[];
};

const Footer: React.FC<FooterProps> = ({ children }) => (
  <div className="offcanvas-footer">
    { children }
  </div>
);

export default Footer;
