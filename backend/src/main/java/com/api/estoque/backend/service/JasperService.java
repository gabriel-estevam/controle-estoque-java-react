package com.api.estoque.backend.service;

import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.core.io.ResourceLoader;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;

@Service
public class JasperService {
	private static final String JASPER_DIRETORIO = "classpath:jasper/";
	private static final String JASPER_SUFIXO = ".jasper";

  @Autowired
  private ResourceLoader resourceLoader;

  //@Autowired
  //private Connection connection;
  @Autowired
  private JdbcTemplate jdbcTemplate;
  
  public byte[] exportarPDF(String filename) throws JRException, IOException, SQLException {
    byte[] bytes = null;
    Resource resource = resourceLoader.getResource(JASPER_DIRETORIO + filename + JASPER_SUFIXO);
    InputStream inputStream = resource.getInputStream();
    Map<String, Object> params = new HashMap<>();
    params.put("IMAGEM_DIRETORIO", JASPER_DIRETORIO);
    params.put("SUB_DIRETORIO", JASPER_DIRETORIO);
    params.put("idFilial", 1);
    Connection connection = jdbcTemplate.getDataSource().getConnection();
    JasperPrint print = JasperFillManager.fillReport(inputStream, params, connection);
    bytes = JasperExportManager.exportReportToPdf(print);
    return bytes;
  }
}
