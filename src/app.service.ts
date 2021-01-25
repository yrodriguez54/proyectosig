import { Injectable, Inject } from '@nestjs/common';

@Injectable()
export class AppService {

  constructor(@Inject('dbconnection') private readonly db) { }

  async getmunici() {

    let limitem = await this.db.query(
      "SELECT\n" +
      "	row_to_json ( fc ) \n" +
      "FROM\n" +
      "	(\n" +
      "	SELECT\n" +
      "		'FeatureCollection' AS TYPE,\n" +
      "		array_to_json (\n" +
      "		ARRAY_AGG ( f )) AS features \n" +
      "	FROM\n" +
      "		(\n" +
      "		SELECT\n" +
      "			'Feature' AS TYPE,\n" +
      "			ST_AsGeoJSON ( lg.geom ) :: json AS geometry,\n" +
      "			row_to_json ((\n" +
      "					gid,\n" +
      "					nombre \n" +
      "				)) AS properties \n" +
      "		FROM\n" +
      "			municipio_el_doncello AS lg \n" +
      "		) AS f \n" +
      "	) AS fc;"
    );
    return await limitem.rows[0].row_to_json
  }


  public async getSedes() {
    let result = await this.db.query("SELECT ST_AsGeoJSON(geom), nombre FROM sedes_educativas_doncello");

    const sedes = result.rows.map((row) => {
      let geojson = JSON.parse(row.st_asgeojson)
      geojson.properties = { nombre: row.nombre }
      return geojson
    });

    return await sedes;
  }

  /*public async getHoteles() {

    let result = await this.db.query('SELECT ST_AsGeoJSON(geom), nombre FROM "Hoteles"');
    const hoteles = result.rows.map((row) => {
      let geojson = JSON.parse(row.st_asgeojson)
      geojson.properties = { nombre: row.nombre }
      return geojson
    });
    return await hoteles;
  }*/


}
