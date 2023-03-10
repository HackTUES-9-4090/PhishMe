import Center from "./Center";
import Logo from "./Logo";
import VerticalCenter from "./VerticalCenter";
import "./styles/Loading.css";

export default function Loading() {
  return (
    <Center>
      <div className="LoadingWrapper">
        <VerticalCenter>
          <div className="Loading">
            <Logo size={{ height: 80, width: 80 }} />
          </div>
        </VerticalCenter>
      </div>
    </Center>
  );
}
