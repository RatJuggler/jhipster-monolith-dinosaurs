package com.rj.dinosaurs.cucumber;

import com.rj.dinosaurs.DinosaursApp;
import io.cucumber.spring.CucumberContextConfiguration;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.web.WebAppConfiguration;

@CucumberContextConfiguration
@SpringBootTest(classes = DinosaursApp.class)
@WebAppConfiguration
public class CucumberTestContextConfiguration {}
