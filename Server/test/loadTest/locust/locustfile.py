import time
from locust import HttpUser, task, between

class QuickstartUser(HttpUser):
    wait_time = between(1, 2)

    @task
    def go_write_request(self):
        for i in range(100):
            self.client.get(f"/go/write?line=20")
            time.sleep(1)
    
    @task
    def node_write_request(self):
        for i in range(100):
            self.client.get(f"/node/write?line=10")
            time.sleep(1)
    
    @task
    def go_sha256_request(self):
        for i in range(100):
            self.client.post("/go/sha256", json={"Num1":5, "Num2":5})
            time.sleep(1)
    
    @task
    def node_sha256_request(self):
        for i in range(100):
            self.client.post("/node/sha256", json={"Num1":6, "Num2":6})
            time.sleep(1)    




