import dynamic from "next/dynamic";
import Container from "react-bootstrap/Container";

const SessionTimeoutModal = dynamic(() => import("@app/components/modals/session-timeout"), { ssr: false });
const TopBar = dynamic(() => import("@app/components/layout/topbar"), { ssr: false });
const ContentHeader = dynamic(() => import("@app/components/layout/page-header"), { ssr: false });
const Toaster = dynamic(() => import("@app/components/toaster"), { ssr: false });

export default function Layout({
  children
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactElement {
  return (
    <div className="db-layout">
      <SessionTimeoutModal show={ false } />

      <TopBar />
      <div className="db-layout__main-container px-4 pt-3 pb-5">
        <Container>
          <ContentHeader />
          <div>
            { children }
          </div>
        </Container>
      </div>

      <Toaster />
    </div>
  );
}
