import 'package:flutter/material.dart';
import 'package:google_maps_flutter/google_maps_flutter.dart';
// import 'package:google_maps_flutter/google_maps_flutter.dart';
import 'package:medloc/partials/style.dart';
import 'package:medloc/screens/mapScreen.dart';
// import 'package:location_permissions/location_permissions.dart';
// import 'package:geolocator/geolocator.dart';

class HomePage extends StatelessWidget {
  const HomePage({Key key}) : super(key: key);


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(
          "MEDLOC",
          style: titleStyle,
        ),
        centerTitle: true,
        backgroundColor: Color(0xFF30475e),
      ),
      body: Stack(
        children: <Widget>[
          // GoogleMapScreen(),
          GoogleMap(
            onMapCreated: (GoogleMapController controller) {
              // _controller = controller;
            },
            // markers: _markers,
            // Set.of(((marker != null) ? [marker] : [])) ,
            // mapType: MapType.,
            initialCameraPosition: CameraPosition(
              target: LatLng(12.920962, 80.239928),
              zoom: 15,
            ),
          ),
          Positioned(
              right: 10,
              top: 10,
              child: FloatingActionButton(
                onPressed: () async {
                // await Geolocator.getCurrentPosition().then((value) => {
                //       print( value.toString())
                //     });
              },
                child: Icon(Icons.search),
                backgroundColor: Color(0xFFf05454),
              )
              )
        ],
      ),
    );
  }
}


