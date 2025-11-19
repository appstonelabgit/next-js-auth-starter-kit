import axios from '@/lib/axios'

export const userRepository = {
    getUser: async () => {
        try {
            const { data } = await axios.get('/auth/user')

            return data.user
        } catch {
            return null
        }
    },
}
