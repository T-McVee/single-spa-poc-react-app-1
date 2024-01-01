import Parcel from 'single-spa-react/parcel';
import * as parcelConfig from '../../react-app-2/src/parcel/MyParcel';
import { bind } from "@react-rxjs/core";
import { showParcel, counter } from '../../common/src/test-poc-common'

export default function Root(props) {
  const { isParcelMountedSubject, toggleIsMounted, getCurrentState } = showParcel();
  const { counterSubject, getCount } = counter();

  // subscribe to Subjects
  const [useIsParcelMounted$] = bind(isParcelMountedSubject, getCurrentState());
  const [useCounter$] = bind(counterSubject, getCount());

  // Get streams with subject's current value
  const isParcelMounted = useIsParcelMounted$();
  const currentCount = useCounter$(); 

  return (
    <section style={{border: 'red 1px solid', padding: '2rem'}}>
      <h1>React App 1 is mounted!</h1>
      <h3>Parcel mounted: {isParcelMounted ? 'true' : 'false' }</h3>
      

      <p>Count: { currentCount }</p>

      <button onClick={toggleIsMounted}>{ !isParcelMounted ? 'Mount ' : 'Unmount '} react app 2 parcel</button>

      {isParcelMounted && (
        <div style={{margin: '2rem'}}>
          <Parcel config={parcelConfig} />
        </div>
        )}
    </section>
  );
}
