import { Suspense } from "react";
import { Spinner } from "reactstrap";

const Loadable = (Component:any) => {
  const LoadableComponent = (props:any) => (
    <Suspense fallback={<Spinner />}>
      <Component {...props} />
    </Suspense>
  );

  // Set a display name for the HOC
  LoadableComponent.displayName = `Loadable(${Component.displayName || Component.name})`;

  return LoadableComponent;
};

export default Loadable;
