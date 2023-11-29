package com.api.estoque.backend.controller;

import java.io.IOException;
import java.sql.SQLException;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.api.estoque.backend.service.JasperService;

import net.sf.jasperreports.engine.JRException;

@Controller
@RequestMapping(value = "api/report")
public class RelatorioController {
    @Autowired
    private JasperService service;

    @GetMapping("/pdf")
    public void download(
        @RequestParam(name = "rpt", required = false) String reportName,
        @RequestParam(name = "idFilial", required = false) int idFilial,
        HttpServletResponse response
    ) throws JRException, IOException, SQLException {
        byte[] bytes = service.exportarPDF(reportName,idFilial);
        response.setContentType(MediaType.APPLICATION_PDF_VALUE);
		response.setHeader("Content-disposition", "attachment; filename="+reportName+".pdf");
		response.getOutputStream().write(bytes);
    }
}
