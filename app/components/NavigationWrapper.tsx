import { getPledgesAction } from '@/lib/actions';
import Navigation from './Navigation';

export default async function NavigationWrapper() {
    const counts = await getPledgesAction();
    const totalPledges = counts.reduce_screen_time + counts.take_a_break + counts.quit_for_good;

    return <Navigation totalPledges={totalPledges} />;
}
