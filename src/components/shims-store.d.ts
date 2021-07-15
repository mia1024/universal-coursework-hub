import {Store} from 'vuex'
import type {State as StoreState} from "../store";

declare module '@vue/runtime-core' {
    interface State extends StoreState {
    }

    // provide typings for `this.$store`
    interface ComponentCustomProperties {
        $store: Store<StoreState>
    }
}
