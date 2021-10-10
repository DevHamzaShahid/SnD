import React, { Component } from 'react';
import { View, Text, Image ,FlatList} from 'react-native';
import Title from '../components/Title';

const image = require('../backgroundImage.png');
const DATA = [
    {
        id: '1',
        Image: { uri: 'data:image/jpeg;base64,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' },
        Name: 'Apple',
        RomanName: 'saib',
        price: 'PKR 120 (1KG)'
    },
    {
        id: '2',
        Image: { uri: 'https://purepng.com/public/uploads/large/purepng.com-bananafruitsyellowfruit-981524754330lspp8.png' },
        Name: 'Banana',
        RomanName: 'Kaila',
        price: 'PKR 190 (1KG)'
    },
    {
        id: '3',
        Image: { uri: 'https://www.freepnglogos.com/uploads/grapes-png/grapes-dimidwa-12.png' },
        Name: 'Grapes',
        RomanName: 'angoor',
        price: 'PKR 180 (1KG)'
    },
    {
        id: '4',
        Image: { uri: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgXFhYZFhYaGhkaGhwYGBkYGB4YGBocHBoZGRkeIS4lHh4rHxgcJjgmKy8xNTU1HCQ7QDszPy40NTEBDAwMEA8QHxISHzQrJSw0NDQ0Nj00NDE0PTQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIALEBHQMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABAUCAwYBB//EADwQAAIBAgMGBAUDAgUDBQAAAAABAgMRBCExBRJBUWFxgZGh8AYiMrHRE0LB4fFSYpKy0iMzchQVJENT/8QAGgEBAAMBAQEAAAAAAAAAAAAAAAMEBQIBBv/EAC0RAAMAAgICAQIEBQUAAAAAAAABAgMRBCESMUEFIjJRYdETM3GBkSNiobHB/9oADAMBAAIRAxEAPwD7MAAAAAAAAAAAAAAAAYyklm8gD0EGttOnHjftn66EaW3I8E33aRw7lfJ2sdP4LcFP/wC9x/w+t/4N9Pa8Hrdev2HnP5h4rXwWINFLFRlo0/Q3nSezlpr2egA9PAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwGMpJK7yKnG45vKOS+5FlzTjW2dRDp6RIxe0VHJZvnwX5KTGY2T1d/TyRrxFytxEmZ1ct0zSwcaTGdZyeT/uYU6jV1dPxvmauLXuxrlK2SdklmumZ5N7ZorDPolwqcn9tTPfs9b/kgQmZRq8rHao9eFFtTxDT1J+H2rKPG65M52FTL22b6dXPU7m2vRBfGl+0dpg9pxnlo/TzLA4alOzyZe7N2l+2WnPl/QtRl30zLz8Vx3Jeg8TPScqAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHhhOaSbbskZnP7bxt3urRa9yHNlWKHTO8cO60j3FbR33ZZR4derNFiupztK3PP8AJZR0uYN56ytts0f4ShJI0yjcjVsMmtCbI01nkQ712SRT30U1eCjkrlbNWfv0LTGKzuVdWLbJ8d/JqYe0IzdrCUl1MIR5GUiwmyfS2Z0Z+P8ABIhNe/vn3IFzbGWhImcVOyyo1bMm0K3mVGGhKb+WLfPgvMtqODa+qXhH8v8AAeaZ9spZlC6b7Oj2Vjb/ACvwLdHI0pqNrXy73N0tpy4yf2O19TxSuzKycV1W5OnByzx8r/U14s2Qxs+Dfmz1fVMbfpkb4lr5OmBR0toyTzd/AmUtoJ6q3XgWY5eK/nRFWG5LA9MITTV07oyLKeyI9AB6AAAAAAAAAAAa6tWK+ppdwDMFfU2tTXN9l+TBbbpWu213Tf2uc+SXyc+c/mWYIlHaFOX0zi3yuk/J5ku56mn6PU0/RGx1bdg3xtl3Zyjzd34l5t6p8qj3f4/koIPn2X56mP8AUL3Xj+RpcSPtdGqtdWaWjLOmyDXpu1vU2YOtddVr+TIitU5LdrynaJMpGE2ZyZ5KNySmRz0VGMhxZW1cuGZdYqmVWJg29LdDvHWzRwVtEFOxjv8AMymre7mqUi7L6LiSMo8OpeYDZOW9U04Lj4vh2M9jbN3UpzXzPOKf7Vz7/YtJSIsmbx6RnZ+Q2/GP8mO6kko2S5LTyFzBzsYuXmU3XyVkmJI83UY58zzfIKa96O0mZvLQb3M1Tn0Nar2z9Ql2dKWydCXW5sjU4ZESGKTy1MnO+a4lqevRG4fyWuGxDTyfvqi2o4xPXJ+hzeHnx4EyFW5p4M9StFPNhTZ0QKrC4prJ5x9V26FonfM08eRWuijUOX2ZAAkOQAAAAADw1zoxlrFN9UmbQeNbBz+38GlD9SKScfqsmrx8Msm+PC/I56WKtq1pw+3I79o4PbmznQleKvTd1H6pNO30ttOzzyzzVyrnlr7kVc0P8SIs5xbydmuHDI8jj5Q0lKPaTXonmVla1ryd30drLksu/i2Qp15WbecLWW81n1XP0RArKyo7ShiJVKUZSk5O8lfopNGO7miD8PVt7DQ6Tmuf7m/5Jt8zN5b3bPqOH/JX9DfKGRXVm4S3l4roWNJ5ELHIz6fe0WcfvTJVCupWaN6Zyk8S4PJ8dOpYbM2zGc/05SSqNNqPNLW3Xj5kyTpbOsmFyvL4LWsVGLjq2W8yqxqaPIf3HeB9lVXfuxI+HsF+pUcpL5YeTlwXhr5cyLidPM6rZeF/TpRj+629LvLN+WngX1WpJ+Tl8cel7fX7kmoyNOVyRNmiSKV7ZnyYs0ufIzqM1tkNbb0iaZMXLy7Hk5paZsxnLw62MHPLS7WoUkikyjPhz4++xrbzvy7r2vyapzS6e+Bgp5X/AKePodJaJVHySU7vPLvmboP3y4ET9TT371RLik1k7PUtROzi1okQbWS78vf9SVCpZ55Gig1l0yM60fH8FqVpbRVrTemWFOXEn4KvZ2ej06Mo8LWWl878eXtE6nPzLWO9NNFTLj9pnQA0YWrvLqjeaU0qW0Z7Wno9AB6eAAAAAAHhGxtKMoSjNXi4u+bWXHNZrwJLOI+INsyqS/TpvdhezfOz17ZZEWXIonbOLpSuzmsXiYb0oRldJ/LvK28no7O+ZV42Lks5W0VlpurJJX6L3Y3bUoxeUVeSz5y118+RUQxk4/JOLa4SatK3+ZcTOSftFBy/aOt+DK//AEakG18tS/hKKt/tZc1J5nMfCFeKqThFpxnC+Wm9F387SZ0dR5lPkTt7PpPplK8K/Tok05mGJWRohUzJEZbyM6pZfc+L2c5jaLvfkUVTCVI141ILPfi75XW67tX5NZPu9TuK+HIUcPboS487x/BLVLJOmXLeV9eJX4yJMw9RbqXSxCxf3PF+LZHj2qK3C0t6tGPByV+yzfojrpanNbFj/wDIV+EZP0t/J0ki3r7DjlVu0v0PJojzkbXIjzl7uV7ZxCNNSXv34Gic8uZlORqm/fvuQLvsszJrlLy8vf8AQxqSVjJmmSbX980SJbJpSNcnfP7M8lPTS3Dj6GuUrfYxU7fVnfL+xIkT+JLUvfHuSqFR6Lw8Pf3K+lNPL3yJtCeenvhn74FiCHJPROpT4NZe7q3c3Td1u3/PT7Gqm+nn7zPJO39e39C0l0U2uyFPFJcc+JcYDFKRxOJxm9JtXtfIudjYp3V8r+8vNEWKmmWc/F/09nb4apZp+8y1TKPDTuW+FnePbI1cF7ej53POmbwAWSAAAAAAAp/iHG/p0rL6pZLtbN/bzOElHK9+yWXHiy9+K6rlW3Er7sUumebb817ZS7qimn8za8F0St1/oZ2enWTXwinle6KnEVrvJ8Ena9vHxWpU7Qwrbdotd0dF+k3Les+Ky0zVvszROjFJ2tJ59Vm+pxKeyNHJYKrOhVhUSyjK7XOOko+TZ9LqTUrSTvFpOL5pq6Zwu0YWz4/tXf8Ac1y5eZL+GNtJWw9SVs/+nJ6Xb/7b7vOPiuR5kjyRqfTeSsd+Nen/ANnSqbubqdVrokRpxadgpP35mfcaZ9N4qkWX6qa6mM0myJGdjPf/AIK9QmR+GvRm8tGRsXVyM5VMyNiZnkzp6OlPfZt+HZXxD6Ql94o6SZzfwx/3pv8Ayfyjo5su+pRU5H8z+yNUmaKnE3TZHnIq5EIRolA0Sfte+hIny6GmRClosyzW489OhhPPT7e+Z7fyNU9faPdk0ojyyevr6Gib5PL3+TKqnfjr78LmD8V2ZNJalHsZWfo726Fph5Xs+F+/vQrKVPhwuW2Ep5K2lyfH7Ic7SRNpNNFV8QYvdptL6pfKs/8AU/J28UXCppJu9kld30SV23flqcbXxyrzc7fLdqH/AIp5O3N6+JZyV4wVuNKvJv4XZBw175/kvtmTd7L31ZXww+Zc4KCTM+8/j6NHkUnJ12Adolzg3qUOzldWuXmDWfganCp00z5TkrTZNABrFIAAAHh6ADh9tyvXmr8r525Wv5ehEhhUlvS05aaW142Onr7BjKtKrvZy3cmrpOKtdd8tTdDYkP3Ny9CusTbbZA8bbZxOKmoR1jaz5WXa3cpcTi4Qy+p8s2nxtbjlzPo+L+F6FRWtKLzzUnfO3O6ytyOb2n8Ay+aVGrvZ/LCatk2rpzvnZX4EWTHa/Cjh4qRwO0cQ5N2V89dVl1KDEQs7rXn+Pz2O3xvwhi4RbdGUkkm9zdm83ayjF7zeedk+ZS19gYi7X/p6t1FybdOeUUr3eWWnciny32n/AIPFLXwWfw5t/wDVSpVpWqrKE3pNaJSfCf37638010+/Q+cVdn1L2/TnmotLcndqTtFpW4vJc+B3HwzhsdNblXD1ZRjaKnNbk1d2zU3HfStm1mrcTm8Xl2kbPB+oOdRk9fD/AHJ8z3f4HuKw0oNxkmmuepElO3MpViaZvS1a2jZUqETEVGzyVVGipO6H8M6S0WPwxVtiLX+qMo+Ks/tFnV1D59hq7p1Iz/wyT7q+a8VdH0Kdmk07p2afNPNM6qdSUeVOrVfmR5miZvkaZoqWcya5EafP2jbJ8DTKS982RIsSjU5a+/Q1TWrM5RMJLXP2uiPfknkhVW37Zhu8dfbJE6fT8djGNO64akm9FlUtGMI6PwXQt8DwVyujRz6cP7+Zb4GnoSTaT7K2el4m/aNGUsNXivqdKol3lCSXqzicNhZRjGN95xSTdrXa4n0rDwVrPjqcniMH+nUdP9usW87xen8rwOs2RuFr0VOHlStr5/8ACBTpPLkTKdRR7lhDCJrTU1PB3a6ZXKkz5V93ouPNNey02fiW7ZP+Tp8A9exzOzKDTz5nU4CFo35/wb3DlJLRhc3x30TAAaJnAAAAAAAAAAAAA8PQAeA9ABoxGHjNWlFNdVcoMb8I05ZwlKm/9S8nn6nSg4qJr2iSM14/wvR8/wAR8GVl9MoyXdxfla3qQKnwtil/9d10lH/kfTzwhfFh/mW5+o5l70/7Hyer8LYrhQl/qh/yOj2PhK8KMY1qbhKLcY3lGV46r6W9L2z5HbGnEUVKLT8O5xXEly9exfPvJpUlo5SaNLJeJptSaeqIkkYWSXL0y7je1sjzjmaZvIlSWRqlH33Id6LM0Q2jxq5ucbXXX+wUf7hMl8iLOCz9LGEcvdiTWg/fQ1/ps6b6JFXR5Tjn0LXCtLw7ECCsSIS0/PvgcabZDl+7ovKNQpvix23J8m4vs1df7WSqNQrPiipeFNcXO68Iu/3RdifsaZVwY9ZkzXgcc27fxl4F/QgnFW04HJ7OUk8/LkdfsuN49mdrGn6JeYlHaJGEpfNZHQQjZJEHAUNZPwLA2ONHhJhZr8qPQAWCEAAAAAAAAAAAAAAAAAAAAAAAAAAAr9o4FVFllJaP+GczXg4NqSs1kdqQsbgY1Fnk+DWqKHL4ay/dPstYOR4dP0chcxcl799DfjsBOk81lwa0fiRJTvqYOTHUVqlpmvDVLcvaE2jCUVZamG/Y2KaOZJtaMW1yMW3wQcs178j2Dvw6IkS2dejXu8zZDmbYw55e9DfTp8iSYRxV9CjBuxT7bnv1VFZqK3fF5y8sl4MucbiVSikvray6dX/HXxKfDYbeejvz1z6k3+0YOm8j9fBu2fQzR2WzcL8qWiK7ZOy7tO3d8DpYU92yWhocbBv7qM3nclW/GTYsskZGKMjRMs9AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAPD0AGuUU1Zq6fPMpcd8PQldwe4+WsfLgXoIsuGMi1S2SY8tw9y9HBYzYteH7d5c4u/pr6Fa207NNdGrH06xrqUIvWKfdJ/czr+lz7h6/r2Xo+pUlq1v/g+cQmyZST0R2q2bS/8Azh/pj+DZHCwWkYrskeT9Npe2juvqKfqTkKWDdnJp24mqpiJ2ao0Zyf8AicJbq62tn42O5SPbE88CZ9Mrvmtv0cDhdg4icrzi1fWUml42Tv6HS4HYEKdr/N4WX8sugT4+Ljjv2/1OMvMy5Frel+hjCKSslZGTR6CyVTyx6AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwAA9AAB4egHgPAeg9YAAAAAAAAAAAAP/2Q==' },
        Name: 'peach',
        RomanName: 'Aarroo',
        price: 'PKR 280 (1KG)'
    },
    {
        id: '5',
        Image: { uri: 'https://atlas-content-cdn.pixelsquid.com/stock-images/galia-melon-DxVdve5-600.jpg' },
        Name: 'Melon',
        RomanName: 'Karbooza',
        price: 'PKR 30 (1KG)'
    },

    {
        id: '6',
        Image: { uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT6cCbWCq9usMxCZ_JYLL9TMPO_oFPespfj1SrjUqrHY1KDYBSVnNT5rDoGmwT2T3nR6g0&usqp=CAU' },
        Name: 'Carrot',
        RomanName: 'gaajar',
        price: 'PKR 80 (1KG)'
    },

];
export default function Fruits({navigation}) {
    return (
        // <SafeAreaView style={{ flex: 1 }}>
        <View style={{ flex: 1, justifyContent: 'center' }}>
            <Image
                source={image}
                style={{ height: '100%', width: '100%', position: 'absolute' }}

            />
            <Title
                title={'Fruits'}
                onPress={()=>navigation.goBack()}
            />

            <FlatList
                data={DATA}
                numColumns={2}
                renderItem={({ item }) =>
                    <View style={{ flex: 1, }}>

                        <View style={{ backgroundColor: '#fff', borderRadius: 10, width: '95%', margin: 5 }}>
                            <Image
                                style={{ margin: 5, alignSelf: 'center', height: 150, marginTop: 20, width: '90%' }}
                                source={item.Image}
                            />
                            <Text style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10, fontSize: 18, color: 'orange', fontWeight: 'bold' }}>{item.Name}</Text>
                            <Text style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10, fontSize: 18, color: 'orange', fontWeight: 'bold' }}>{item.RomanName}</Text>
                            <Text style={{ paddingLeft: 10, paddingRight: 10, paddingBottom: 10, fontSize: 14, color: '#000' }}>PKR 180 (1KG)</Text>
                        </View>
                    </View>
                }
            />
        </View>

    );

}