import { useMasterClock } from '@/hooks/useMasterClock';
import { useDom } from '@/hooks/useDom';
import { Overlay } from '@/components/shell/Overlay';

export function App() {
  useMasterClock();
  useDom();

  return <Overlay />;
}
